package com.app.common.auth;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.app.models.Account;
import com.app.service.AccountService;

//@Service
@Component
public class LoginUserDetailsService implements UserDetailsService {

  @Autowired
  AccountService accountService;

  // @Autowired
  // private AuthenticationManager authenticationManager;

  // 필자의 경우 기존 해시 시스템이 좀 다르기 때문에
  // 이부분을 적용한다면 암호가 구형시스템이라면 바꿔주는 부분이 필요.
  // @Autowired
  // private HttpServletRequest request;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String ac) throws UsernameNotFoundException {
    // 기존해시와 신규해시가 다를경우 이런식으로 받아 처리할 수 있음.
    // 위 @Autowired HttpServletRequest request;
    // request 처리

    Account account = accountService.getAccount(ac);

    if (account == null) {
      // 계정이 존재하지 않음
      throw new UsernameNotFoundException("login fail");
    }

    // LoginUserDetails aaa = new LoginUserDetails(account);
    // System.out.println("aaa.getUsername() : " + aaa.getUsername());
    // return aaa;
    // return new LoginUserDetails(account);

    Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
    // for (Role role : user.getRoles()) {
    grantedAuthorities.add(new SimpleGrantedAuthority(account.getRole()));
    // }

    UserDetails userDetails = new org.springframework.security.core.userdetails.User(account.getAc(), account.getPw(), grantedAuthorities);

    System.out.println("###################################### STARTED");
    System.out.println(account.getPw());
    System.out.println(userDetails.getPassword());
    System.out.println("###################################### ENDED");

    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, userDetails.getPassword(), userDetails.getAuthorities());

    // authenticationManager.authenticate(usernamePasswordAuthenticationToken);

    // SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

    return userDetails;

    // UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
    // = new UsernamePasswordAuthenticationToken(userDetails, password,
    // userDetails.getAuthorities());

  }

  /*
   * private List<GrantedAuthority> buildUserAuthority(Set<Account> userRoles) {
   * 
   * List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(0);
   * for (UserRole userRole : userRoles) { authorities.add(new
   * SimpleGrantedAuthority(userRole.getUserRoleName())); }
   * 
   * return authorities; }
   */

}
