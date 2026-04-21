import { Component, OnInit } from '@angular/core';
import { SHARED } from '../shared';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-users',
  imports: [SHARED],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  AllUsers: any[] = [];
  constructor(private loginService: LoginService) {}
  
  ngOnInit() {
    this.loginService.GetAllUsers().subscribe((users) => {
      this.AllUsers = users;
    });
  }

}
