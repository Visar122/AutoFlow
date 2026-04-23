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
  searchQuery = '';

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loginService.GetAllUsers().subscribe((users) => {
      this.AllUsers = users;
    });
  }

  searchUsers() {
    if (!this.searchQuery.trim()) { this.loadUsers(); return; }
    this.loginService.SearchUsers(this.searchQuery).subscribe(users => { this.AllUsers = users; });
  }

  clearSearch() {
    this.searchQuery = '';
    this.loadUsers();
  }

  updateStatus(email: string, status: string) {
    this.loginService.UpdateUserStatus(email, status).subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(email: string) {
    if (!confirm(`Slet bruger ${email}?`)) return;
    this.loginService.DeleteUser(email).subscribe(() => {
      this.loadUsers();
    });
  }
}
