package com.app.common.auth;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SignInFailure implements ApplicationListener<AuthenticationFailureBadCredentialsEvent> {

  @Override
  public void onApplicationEvent(AuthenticationFailureBadCredentialsEvent event) {
    User userDetails = (User) (event.getAuthentication().getPrincipal());

    String account = userDetails.getUsername();
    String password = userDetails.getPassword();
    // logger.info("임시 : 접속실패 : " + account + " / " + password);
    log.info("임시 : 접속실패 : " + account + " / " + password);

    // 임시라서 패스워드를 저렇게 처리했지만...
    // 여기서 오는 패스워드는 인코딩 전 패스워드이기 때문에 보안상 해싱을 하거나 별도의 처리를 해줘야합니다.
    // 여러번 실패할경우 캡차라던지 접속 제한을 걸어야함.
    // 해외 어떤 서비스들은 접속실패시 비밀번호가 변경 이전 비밀번호의 경우 변경되기 이전이라고
    // 알려주는 경우도 있지만.. 보안상 추천하지 않는 방법.
  }
}