import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from '../account'; 
import { AccountService } from '../account.service'; 
import { timeout } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent {

  account: Account = new Account();
  accountCreate=false;
  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  onSubmit() {
    this.saveAccount();
  }

  saveAccount() {
    this.accountService.createAccount(this.account).subscribe({
      next: (data) => {
        console.log(data);
        this.accountCreate=true;
        setTimeout(() => {
        this.goToAccountList();
        },2000);
         
      },
      error: (err) => {
        console.error("Error creating account:", err);
      }
    });
  }

  
  goToAccountList() {
    this.router.navigate(['/accounts']);
  }
}