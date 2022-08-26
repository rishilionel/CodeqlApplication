package com.SpringBootwithMySQL.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SpringBootwithMySQL.entity.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
  
}
