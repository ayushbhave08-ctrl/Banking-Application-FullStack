import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = "http://localhost:8080/api/accounts";

  constructor(private httpClient: HttpClient) { }

  getAllAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.baseUrl}`);
  }

  createAccount(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(`${this.baseUrl}`, account);
  }

  getAccountById(id: number): Observable<Account> {
    return this.httpClient.get<Account>(`${this.baseUrl}/${id}`);
  }

  deposit(id: number, amount: number): Observable<Account> {
    const request = { amount };
    
    
    return this.httpClient.put<Account>(`${this.baseUrl}/${id}/deposit`, request);
  }

  deleteAccount(id: number): Observable<any> {
  return this.httpClient.delete<any>(`${this.baseUrl}/${id}`);
}
}