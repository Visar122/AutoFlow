import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-my-account',
  imports: [SHARED],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount implements OnInit {
  myInfo: any = null;
  editMode = false;
  successMessage = '';
  errorMessage = '';

  form = {
    firstName: '',
    lastName: '',
    carPlate: '',
    carPlate2: '',
    password: ''
  };

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    const user = this.loginService.getUser();
    if (user && user.email) {
      this.loginService.GetMyInfo(user.email).subscribe({
        next: (res: any) => {
          this.myInfo = res;
          this.form = {
            firstName: res.firstName,
            lastName: res.lastName,
             password: '',
            carPlate: res.carPlate ?? '',
            carPlate2: res.carPlate2 ?? ''
           
          };
        },
        error: (err) => console.error('Error fetching user info:', err)
      });
    }
  }

  saveChanges() {
    if (this.form.password && this.form.password.length < 8) {
      this.errorMessage = 'Adgangskode skal være mindst 8 tegn';
      setTimeout(() => this.errorMessage = '', 3000);
      return;
    }

    this.loginService.UpdateInfo({ ...this.form, email: this.myInfo.email }).subscribe({
      next: (res: any) => {
        this.myInfo = res;
        this.editMode = false;
        this.successMessage = 'Oplysninger opdateret!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => {
        this.errorMessage = 'Noget gik galt, prøv igen';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }
}
