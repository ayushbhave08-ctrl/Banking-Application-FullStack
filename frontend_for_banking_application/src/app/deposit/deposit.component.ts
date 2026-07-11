import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../account';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { NgIf, CommonModule } from '@angular/common';
@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule, NgIf, CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.css'
})
export class DepositComponent  {

  id:number=0;

  account:Account=new Account();

  constructor(private accountService:AccountService,private router: Router,
    private rout:ActivatedRoute){}

  ngOnInit(){

    this.id=this.rout.snapshot.params['id'];
    this.accountService.getAccountById(this.id).subscribe(data=>{
      this.account=data;
    })
  }

  successMessage="";
  errorMessage="";
  

  onSubmit(){

    if(this.isValidAmount(this.account.balance)){ 

    this.accountService.deposit(this.id,this.account.balance).subscribe(data=>{
      this.account=data;
      this.successMessage="Deposit Successfully... !"

      setTimeout(() => {
        this.router.navigate(['/accounts'])
      }, 2000);
      

    })

  }else{
    this.errorMessage="Invalid amount ... please Enter Valid Amount.."

    setTimeout(() =>  {
      this.errorMessage=""

   } , 2000);
  }
}

  isValidAmount(amount:number):boolean{

    return amount>0 && amount<10000000
  }

}