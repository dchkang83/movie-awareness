package com.app.common.auth;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SignInSuccess implements ApplicationListener<AuthenticationSuccessEvent> {
  // Logger logger = LoggerFactory.getLogger(SignInSuccess.class);

  // @Autowired
  // private AuthenticationManager authenticationManager;

  @Override
  public void onApplicationEvent(AuthenticationSuccessEvent event) {
    // String account =
    // ((UserDetails)(event.getAuthentication().getPrincipal())).getUsername();
    // logger.info("임시 : 접속성공 : " + account);
    // log.info("임시 : 접속성공 : " + account);
    User userDetails = (User) (event.getAuthentication().getPrincipal());
    // UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
    // new UsernamePasswordAuthenticationToken(userDetails,
    // userDetails.getPassword(), userDetails.getAuthorities());

    log.info("임시 : 접속성공 - userDetails.getUsername() : " + userDetails.getUsername());
    log.info("임시 : 접속성공 - userDetails.getPassword() : " + userDetails.getPassword());

    // authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    //
    // SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

    // 마지막 접속날짜라던지 여러가지.. 입력
  }
}