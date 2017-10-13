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
@MapperScan(value = "com.app.mapper.mssql3", sqlSessionFactoryRef = "mssql3SessionFactory")
public class MsSql3Config {

  @Resource
  private ApplicationContext applicationContext;

  @Value("${spring.mssql.mssql3.driver-class-name}")
  private String dirverClassName;

  @Value("${spring.mssql.mssql3.url}")
  private String url;
  
  @Value("${spring.mssql.mssql3.url-option}")
  private String urlOption;

  @Value("${spring.mssql.mssql3.username}")
  private String username;

  @Value("${spring.mssql.mssql3.password}")
  private String password;
  
  @Bean(name = "mssql3DataSource")
  @ConfigurationProperties(prefix = "spring.mssql.mssql3")
  public DataSource mssql3DataSource() {
    
//    return DataSourceBuilder.create().build();
    
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName(dirverClassName);
    dataSource.setUrl(url+urlOption);
    dataSource.setUsername(username);
    dataSource.setPassword(password);
    
    return dataSource;
  }

  @Bean(name = "mssql3SessionFactory")
  public SqlSessionFactory mssql3SessionFatory(@Qualifier("mssql3DataSource") DataSource datasource) throws Exception {
    SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
    sqlSessionFactory.setDataSource(datasource);
    // VO와 DB간의 컬럼 매핑을 자동(camel case)으로 변경
    sqlSessionFactory.setConfigLocation(applicationContext.getResource("classpath:/mybatis/mybatis-config.xml"));
    sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath:/mapper/mssql3/*.xml"));
    return (SqlSessionFactory) sqlSessionFactory.getObject();
  }

  @Bean(name = "mssql3Session")
  public SqlSessionTemplate mssql3Session(@Qualifier("mssql3SessionFactory") SqlSessionFactory sqlSessionFactory) {
    return new SqlSessionTemplate(sqlSessionFactory);
  }

  @Bean
  public DataSourceTransactionManager mssql3TransactionManager(@Qualifier("mssql3DataSource") DataSource dataSource) {
    return new DataSourceTransactionManager(dataSource);
  }

}
