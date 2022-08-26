package com.SpringBootwithMongoDB.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SpringBootwithMongoDB.entity.Person;
import com.SpringBootwithMongoDB.service.PersonService;

@RestController
public class PersonController {

	@Autowired
	private PersonService personService;

	@GetMapping("/person")
	public List<Person> fetchAll() {
		return this.personService.fetchAll();
	}

	@GetMapping("/person/{id}")
	public Person fetchById(@PathVariable String id) {
		return this.personService.fetchById(id);
	}

	@DeleteMapping("/person/{id}")
	public void delete(@PathVariable String id) {
		this.personService.delete(id);
	}

	@PostMapping("/person")
	public Person create(@RequestBody Person person) {
		return this.personService.create(person);
	}
	
	@PutMapping("/person/{id}")
	public ResponseEntity<Object> update(@RequestBody Person person, @PathVariable String id) {
		return this.personService.update(person, id);
	}
}