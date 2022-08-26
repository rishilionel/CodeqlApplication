package com.SpringBootwithMongoDB.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.SpringBootwithMongoDB.entity.Person;
import com.SpringBootwithMongoDB.exception.EntityNotFoundException;
import com.SpringBootwithMongoDB.repository.PersonRepository;

@Service  
public class PersonService {

  @Autowired
  private PersonRepository personRepo;

  public List<Person> fetchAll() {
    return personRepo.findAll();
  }

  public Person fetchById(final String id) {
    Optional<Person> person = personRepo.findById(id);

		if (!person.isPresent()){
			throw new EntityNotFoundException("id-" + id);
    }
		return person.get();
  }

  public void delete(final String id) {
    personRepo.deleteById(id);
  }

  public Person create(final Person person) {
    return personRepo.save(person);
  }

  public ResponseEntity<Object> update(final Person person, final String id) {
    Optional<Person> personOptional = personRepo.findById(id);
		if (!personOptional.isPresent()) {
			return ResponseEntity.notFound().build();
    }
		person.setId(id);
		personRepo.save(person);
		return ResponseEntity.noContent().build();
  }

}
