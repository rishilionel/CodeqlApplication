package com.SpringBootwithMySQL;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SpringbootMainApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootMainApplication.class, args);
	}

}
