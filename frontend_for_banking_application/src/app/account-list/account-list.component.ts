import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AccountService } from '../account.service'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {

  accounts: any[] = []; 

  
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => {
        this.accounts = data;
      },
      error: (err) => {
        console.error("Error fetching banking data:", err);
      }
    });
  }

  deposit(id: number) {
   
    this.router.navigate(['/deposit', id]);
  }

  // account-list.component.ts chya aat hi method add kara:
deleteAccount(id: number) {
    if (confirm("Are you sure you want to delete this account?")) {
      this.accountService.deleteAccount(id).subscribe({
        next: (data) => {
          console.log("Account deleted successfully:", data);
          // UI instantly refresh karnyasaathi deleted account list madhun kadhun taka
          this.accounts = this.accounts.filter(account => account.id !== id);
        },
        error: (err) => {
          console.error("Error deleting account from backend:", err);
        }
      });
    }
  }
}