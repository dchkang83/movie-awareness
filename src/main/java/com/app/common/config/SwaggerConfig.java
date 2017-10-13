package com.app.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.paths.AbstractPathProvider;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

  private String basePackageRoot = "com.app.controller";
  private String apiVersion = "ver 1.0";

//  @Bean
//  public Docket documentationPlugin() {
//    // return new VersionedDocket("io.swagger.api.v1", "V1");
//    return new VersionedDocket("", "인지도조사");
//  }
  
  @Bean
  public Docket adminDocumentationPlugin() {
    return new VersionedDocket("admin", "어드민");
  }
  
  @Bean
  public Docket customerDocumentationPlugin() {
    return new VersionedDocket("customer", "고객");
  }

  class VersionedDocket extends Docket {
    public VersionedDocket(String version, String groupName) {

      super(DocumentationType.SWAGGER_2);
      super.groupName(version).select()
          // 변경 - 시작
          // .apis(RequestHandlerSelectors.any())
          // .paths(regex("/api/" + version + "/.*"))
          // .apis(RequestHandlerSelectors.any())
          // .apis(RequestHandlerSelectors.basePackage("io.swagger.api."+version))
          // .apis(RequestHandlerSelectors.basePackage("io.swagger.api"))
          // .apis(RequestHandlerSelectors.basePackage("api."+basePackagePath))
          // .apis(RequestHandlerSelectors.basePackage("api.v1.tenbyten"))
          // .apis(RequestHandlerSelectors.basePackage("api.v1"))
          // .apis(RequestHandlerSelectors.basePackage("io.swagger.api.tenbyten"))
          // .apis(RequestHandlerSelectors.basePackage("api.v1"))
          .apis(RequestHandlerSelectors.basePackage(basePackageRoot + "." + version))
          // 변경 - 종료
          .build().apiInfo(getApiInfo(groupName))
          // .pathProvider(new BasePathAwareRelativePathProvider("/api/" +
          // version)) // 추가

          .directModelSubstitute(org.joda.time.LocalDate.class, java.sql.Date.class)

          .directModelSubstitute(org.joda.time.DateTime.class, java.util.Date.class)

          .useDefaultResponseMessages(false)
      // .enableUrlTemplating(true)
      ;
    }

    private ApiInfo getApiInfo(String groupName) {
      return new ApiInfoBuilder()
          // .title("title(" + groupName + ") API")
          .title("app movie awareness (영화인지도 조사) API")

          // .description("comment")
          // .description(groupName + " 연동")
          .description(groupName + " library API.")

          // .version("1.0.0")
          // .version("99.0.0")
          // .version(groupName + " " + apiVersion)
          .version(apiVersion)

          .license(null)

          .licenseUrl(null)

          .termsOfServiceUrl(null)
          // .contact(new Contact("Deokjoon.kang", "", "dchkang83@naver.com"))
          // .contact(new Contact("", "", ""))
          .build();
    }
  }

  class BasePathAwareRelativePathProvider extends AbstractPathProvider {
    private String basePath;

    public BasePathAwareRelativePathProvider(String basePath) {
      this.basePath = basePath;
    }

    @Override
    protected String applicationPath() {
      return basePath;
    }

    @Override
    protected String getDocumentationPath() {
      return "/";
    }

    // @Override
    // public String getOperationPath(String operationPath) {
    // UriComponentsBuilder uriComponentsBuilder =
    // UriComponentsBuilder.fromPath("/");
    // return
    // Paths.removeAdjacentForwardSlashes(uriComponentsBuilder.path(operationPath.replaceFirst(basePath,
    // "")).build().toString());
    // }
  }
}