import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { OrderService } from '../Services/order.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-my-orders',
  imports: [SHARED],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService, private loginService: LoginService) {}

  ngOnInit() {
    const user = this.loginService.getUser();
    this.orderService.getMyOrders(user.email).subscribe(data => { this.orders = data; });
  }
}
