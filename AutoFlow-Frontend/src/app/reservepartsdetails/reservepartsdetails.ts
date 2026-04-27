import { Location } from '@angular/common';
import { ReservepartsService } from './../Services/reserveparts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SHARED } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../Services/order.service';
import { LoginService } from '../Services/login.service';
import { loadStripe, Stripe, StripeCardNumberElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-reservepartsdetails',
  imports: [SHARED],
  templateUrl: './reservepartsdetails.html',
  styleUrl: './reservepartsdetails.css',
})
export class Reservepartsdetails implements OnInit, OnDestroy {
  parts: any = null;
  activeImage = '';

  showOrdermodel = false;
  orderSuccess = false;
  orderError = '';
  isProcessing = false;

  cardHolder = '';

  private stripe: Stripe | null = null;
  private cardNumber: StripeCardNumberElement | null = null;

  constructor(
    private route: ActivatedRoute,
    private reserveService: ReservepartsService,
    private router: Router,
    private location: Location,
    private orderService: OrderService,
    private loginService: LoginService
  ) {}

  goBack() { this.location.back(); }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.reserveService.getpartsbyId(id).subscribe({
      next: (data) => { this.parts = data; this.activeImage = data.imageUrl1; },
      error: () => this.router.navigate(['/reserveparts'])
    });
  }

  ngOnDestroy() {
    if (this.cardNumber) this.cardNumber.destroy();
  }

  async openOrdermodel() {
    const user = this.loginService.getUser();
    if (!user) { this.router.navigate(['/login']); return; }
    this.showOrdermodel = true;
    this.orderSuccess = false;
    this.orderError = '';

    setTimeout(async () => {
      this.stripe = await loadStripe('pk_test_51TPQVOJSJ9176wqYUcOvITfPP0YHLnIIn05uUxXh2t5a11lCjheQIcT2k7ybbi2aSsCNfldTTz3KLnBk5SohrZfV00dYsyFhQs');
      if (!this.stripe) return;
      const elements = this.stripe.elements();
      this.cardNumber = elements.create('cardNumber');
      this.cardNumber.mount('#stripe-card-number');
      elements.create('cardExpiry').mount('#stripe-card-expiry');
      elements.create('cardCvc').mount('#stripe-card-cvc');
    }, 300);
  }

  async placeOrder() {
    if (!this.cardHolder.trim()) {
      this.orderError = 'Udfyld kortholder.';
      return;
    }
    if (!this.stripe || !this.cardNumber) {
      this.orderError = 'Kortfelterne er ikke klar. Vent et øjeblik og prøv igen.';
      return;
    }

    this.isProcessing = true;
    this.orderError = '';

    const user = this.loginService.getUser();
    if (!user) return;

    this.orderService.createPaymentIntent(this.parts.price).subscribe({
      next: async (res) => {
        const result = await this.stripe!.confirmCardPayment(res.clientSecret, {
          payment_method: {
            card: this.cardNumber!,
            billing_details: { name: this.cardHolder }
          }
        });

        if (result.error) {
          this.orderError = result.error.message || 'Betaling fejlede.';
          this.isProcessing = false;
          return;
        }

        const dto = {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
          itemId: this.parts.id,
          itemType: this.parts.category,
          itemName: this.parts.name,
          imageUrl: this.parts.imageUrl1,
          price: this.parts.price,
        };

        this.orderService.placeOrder(dto).subscribe({
          next: () => {
            this.orderSuccess = true;
            this.isProcessing = false;
            this.parts.stock = Math.max(0, this.parts.stock - 1);
          },
          error: () => {
            this.orderError = 'Ordre kunne ikke gemmes.';
            this.isProcessing = false;
          }
        });
      },
      error: () => {
        this.orderError = 'Kunne ikke oprette betaling.';
        this.isProcessing = false;
      }
    });
  }

  closemodel() {
    if (this.cardNumber) { this.cardNumber.destroy(); this.cardNumber = null; }
    this.showOrdermodel = false;
    this.cardHolder = '';
    this.orderSuccess = false;
    this.orderError = '';
    this.isProcessing = false;
  }
}
