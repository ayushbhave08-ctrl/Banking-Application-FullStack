package com.BankingApplication.mapper;

import com.BankingApplication.dto.AccountDto;
import com.BankingApplication.entity.Account;

public class AccountMapper {
	
	public static Account mapToAccount (AccountDto accountDto) {
		
		Account account = new Account(
			accountDto.getId(),
			accountDto.getAccountHolderName(),
			accountDto.getBalance()
		);
		
		
		if (account.getId() != null && account.getId() == 0) {
			account.setId(null);
		}
		return account;
	}
	
	public static AccountDto mapToAccountDto (Account savedAccount) {
		
		AccountDto accountDto = new AccountDto(
			savedAccount.getId(),
			savedAccount.getAccountHolderName(),
			savedAccount.getBalance()
		);
		return accountDto;
	}
}
