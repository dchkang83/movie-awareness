/**
 * 고객 Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-11
 */
package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/customer")
@Slf4j
public class CustomerController {
	@GetMapping("/")
	public String init() {
		log.info("/customer/index");
		return "/customer/index";
	}
	
	@GetMapping("/index")
	public String index() {
		log.info("/customer/index");
		return "/customer/index";
	}

	@GetMapping("/agreement")
	public String agreement() {
		log.info("/customer/agreement");
		return "/customer/contents/agreement";
	}

	@GetMapping("/survey")
	public String survey() {
		log.info("/customer/survey");
		return "/customer/contents/survey";
	}

}