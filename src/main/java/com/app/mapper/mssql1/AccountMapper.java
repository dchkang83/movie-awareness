package com.app.mapper.mssql1;

import org.springframework.stereotype.Repository;

import com.app.models.Account;

@Repository
public interface AccountMapper {

  public Account getAccount(String ac);

}
