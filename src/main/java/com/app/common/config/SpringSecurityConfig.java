package com.app.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configurers.GlobalAuthenticationConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
// http://docs.spring.io/spring-boot/docs/current/reference/html/howto-security.html
// Switch off the Spring Boot security configuration
// @EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  public void configure(WebSecurity web) throws Exception {
    // 메인페이지 : css나 js 같은것들도 여기에 포함시켜준다.
    // web.ignoring().antMatchers("/");
    // web.ignoring().antMatchers("/css/**", "/script/**", "/");
    // web.ignoring().antMatchers("/css/**", "/js/**", "/fragments/**", "/");

    web.ignoring().antMatchers("/css/**", "/image/**", "/js/**", "/plugins/**", "/webjars/**");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.csrf().disable().authorizeRequests()
//    http.authorizeRequests()
        // 위 ignoring 을 제외한 전체가 기본 인증페이지
        // .antMatchers("/**").authenticated()

        /*
         * .antMatchers("/admin").hasRole("ADMIN")
         * .antMatchers("/admin/**").hasRole("ADMIN")
         */

        // .antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
        // user 폴더에 경우 user 권한이 있는 사용자에게만 허용
        // .antMatchers("/user/**").hasAuthority("ROLE_USER")

        // .antMatchers("/admin").hasAuthority("ROLE_ADMIN")

        .anyRequest().authenticated()

        .and()

        .formLogin().loginPage("/admin/login").permitAll()
//        .formLogin().loginPage("/admin/login").permitAll()
        
        
        // 로그인 페이지 : 컨트롤러 매핑을 하지 않으면 기본 제공되는 로그인 페이지가 뜬다.
        // .loginProcessingUrl("/login")

        .and()

        .logout()
        // /logout 을 호출할 경우 로그아웃
        .logoutRequestMatcher(new AntPathRequestMatcher("/admin/logout"))
        // 로그아웃이 성공했을 경우 이동할 페이지
        .logoutSuccessUrl("/admin/index")

        .and().exceptionHandling().accessDeniedPage("/403"); // 권한이 없을경우 해당 url로
                                                             // 이동

    /*
     * http.csrf().disable() .authorizeRequests() .antMatchers("/", "/home",
     * "/about").permitAll() .antMatchers("/admin/**").hasAnyRole("ADMIN")
     * .antMatchers("/user/**").hasAnyRole("USER") .anyRequest().authenticated()
     * .and() .formLogin() .loginPage("/login") .permitAll() .and() .logout()
     * .permitAll() .and() .exceptionHandling();
     * //.exceptionHandling().accessDeniedHandler(accessDeniedHandler);
     */
  }

  @Configuration
  public static class AuthenticationConfiguration extends GlobalAuthenticationConfigurerAdapter {
    @Autowired
    UserDetailsService userDetailsService;

    @Bean
    PasswordEncoder passwordEncoder() {
      // 스프링에서 제공하는 기본 암호 인코더
      // return new BCryptPasswordEncoder();

      // 커스텀 인코더를 사용하고있다.
      // return new MyPasswordEncoder();

      // 인증에 기본 스프링 해시를 사용하겠습니다.
      return new BCryptPasswordEncoder();
    }

    @Override
    public void init(AuthenticationManagerBuilder auth) throws Exception {
      auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }
  }

  // 암호 인코더 커스텀 설정
  public static class MyPasswordEncoder implements PasswordEncoder {
    @Override
    public String encode(CharSequence rawPassword) {
      // 여기서는 이렇게 처리하였지만 예를들어 sha-2 / sha-3 같은 해시를 접목시킬 수 있다.
      // 여기서는 간단히 EN-을 붙여 확인하는 용도!

      System.out.println("rawPassword.toString() : " + rawPassword.toString());

      // return "EN-" + rawPassword.toString();
      return rawPassword.toString();
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
      // rawPassword 현재 들어온 값 | encodedPassword 매칭되는 계정에 있는 값
      return encodedPassword.equals(encode(rawPassword));
    }
  }
}
