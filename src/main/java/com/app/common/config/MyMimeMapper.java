package com.app.common.config;

import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.MimeMappings;
import org.springframework.stereotype.Component;

@Component
public class MyMimeMapper implements EmbeddedServletContainerCustomizer {
  @Override
  public void customize(ConfigurableEmbeddedServletContainer container) {
    MimeMappings mappings = new MimeMappings(MimeMappings.DEFAULT);
    mappings.add("woff", "application/font-woff");
    mappings.add("woff2", "application/font-woff2");
    container.setMimeMappings(mappings);
  }
}