package com.app.common.config.datasource;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
@MapperScan(value = "com.app.mapper.awareness", sqlSessionFactoryRef = "awarenessSessionFactory")
public class AwarenessConfig {

  @Resource
  private ApplicationContext applicationContext;

  @Value("${spring.mariadb.awareness.driver-class-name}")
  private String dirverClassName;

  @Value("${spring.mariadb.awareness.url}")
  private String url;
  
  @Value("${spring.mariadb.awareness.url-option}")
  private String urlOption;

  @Value("${spring.mariadb.awareness.username}")
  private String username;

  @Value("${spring.mariadb.awareness.password}")
  private String password;
  
  @Primary
  @Bean(name = "awarenessDataSource")
  @ConfigurationProperties(prefix = "spring.mariadb.awareness")
  public DataSource awarenessDataSource() {
    
//    return DataSourceBuilder.create().build();
    
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName(dirverClassName);
    dataSource.setUrl(url+urlOption);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    
    return dataSource;
  }

  @Primary
  @Bean(name = "awarenessSessionFactory")
  public SqlSessionFactory awarenessSessionFatory(@Qualifier("awarenessDataSource") DataSource datasource) throws Exception {
    SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
    sqlSessionFactory.setDataSource(datasource);
    // VO와 DB간의 컬럼 매핑을 자동(camel case)으로 변경
    sqlSessionFactory.setConfigLocation(applicationContext.getResource("classpath:/mybatis/mybatis-config.xml"));
    sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/awareness/*.xml"));
    return (SqlSessionFactory) sqlSessionFactory.getObject();
  }

  @Primary
  @Bean(name = "awarenessSession")
  public SqlSessionTemplate awarenessSession(@Qualifier("awarenessSessionFactory") SqlSessionFactory sqlSessionFactory) {
    return new SqlSessionTemplate(sqlSessionFactory);
  }

  @Primary
  @Bean
  public DataSourceTransactionManager awarenessTransactionManager(@Qualifier("awarenessDataSource") DataSource dataSource) {
    return new DataSourceTransactionManager(dataSource);
  }

}
