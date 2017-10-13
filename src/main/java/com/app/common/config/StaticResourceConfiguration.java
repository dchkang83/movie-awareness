package com.app.common.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class StaticResourceConfiguration extends WebMvcConfigurerAdapter {

  @Value("${file.upload.path}")
  private String path;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/upload_img/**").addResourceLocations("file:" + path);
  }

  @Override
  public void addViewControllers(ViewControllerRegistry registry) {

    // System.out.println("######################### STARTED");
    // System.out.println("######################### ENDED");

    // registry.addViewController("/ie7").setViewName("ie7");
    // registry.addViewController("/admin/login").setViewName("admin/login");
  }

}
