package com.SpringBootwithMongoDB.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.SpringBootwithMongoDB.entity.Person;

@Repository
public interface PersonRepository extends MongoRepository<Person, String> {
  
}