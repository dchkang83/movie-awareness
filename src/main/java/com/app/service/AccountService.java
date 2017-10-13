package com.app.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.mssql1.AccountMapper;
import com.app.models.Account;

@Service
public class AccountService {

  @Resource
  private AccountMapper accountMapper;

  public Account getAccount(String ac) {
    // Account account = new Account();
    // account.setNo(111);
    // account.setAc("dchkang");
    // account.setPw("111");
    // account.setRole("ADMIN");
    //
    // return account;
    // return accountMapper.getAccount(ac);

    Account account = accountMapper.getAccount(ac);

    // BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
    // account.setPw(crypt.encode(account.getPw()));
    //
    // System.out.println("########## crypt.encode(account.getPw()) : " +
    // crypt.encode(account.getPw()));

    return account;

  }
  //
  // public static void main(String args[]) {
  //
  // BCryptPasswordEncoder crypt = new BCryptPasswordEncoder();
  //
  // System.out.println("########## : " + crypt.encode("movie2017@"));
  // }
}
