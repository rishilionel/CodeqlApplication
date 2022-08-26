package com.SpringBootwithMSSQL.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.SpringBootwithMSSQL.entity.Person;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {
  
}