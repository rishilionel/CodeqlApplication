package com.SpringBootwithMySQL.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.SpringBootwithMySQL.entity.Person;
import com.SpringBootwithMySQL.exception.EntityNotFoundException;
import com.SpringBootwithMySQL.repository.PersonRepository;

@Service
public class PersonService {

	@Autowired
	private PersonRepository personRepo;

	public Person fetchById(final Long id) {
		Optional<Person> person = personRepo.findById(id);
		if (!person.isPresent()) {
			throw new EntityNotFoundException("id-" + id);
		}
		return person.get();
	}

	public List<Person> fetchAll() {
		return personRepo.findAll();
	}

	public Person create(final Person person) {
		return personRepo.save(person);
	}

	public ResponseEntity<Object> update(final Person person, final Long id) {
		Optional<Person> personOptional = personRepo.findById(id);
		if (!personOptional.isPresent()) {
			//return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
			throw new EntityNotFoundException("id-" + id);
		}
		person.setId(id);
		personRepo.save(person);
		return ResponseEntity.status(HttpStatus.OK).build();
	}
	
	public void delete(final Long id) {
		personRepo.deleteById(id);
	}

}
