package com.SpringBootwithMySQL.controller;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;

import com.SpringBootwithMySQL.controller.PersonController;
import com.SpringBootwithMySQL.entity.Person;
import com.SpringBootwithMySQL.service.PersonService;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class PersonControllerTest {
	@Mock
	private PersonService service;

	@InjectMocks
	private PersonController controller;
	
	private List<Person> preparePersonRecords(){
		List<Person> person = new ArrayList<Person>();
		Person person1 = new Person(5L, "zySd7");
		Person person2 = new Person(4L, "w8yUH");
		person.add(person1);
		person.add(person2);
		return person;
	}
	
	@Test
	public void testFetchAllPass() {
		Mockito
        .when(controller.fetchAll()).thenReturn(preparePersonRecords());
		List<Person> person = preparePersonRecords();
		List<Person> personFromController =  controller.fetchAll();
		for(int i=0; i < person.size();i++) { 
			Assertions.assertEquals(person.get(i).getId(), personFromController.get(i).getId());
            Assertions.assertEquals(person.get(i).getName(), personFromController.get(i).getName());
		}
		
	}

	@Test
	public void testFetchAllFailure() {
		Mockito
        .when(controller.fetchAll()).thenReturn(preparePersonRecords());
		List<Person> person = null; //Intentionally made null to fail the test.
		List<Person> personFromController =  controller.fetchAll();
		Assertions.assertNotEquals(person, personFromController);
	}
	
	
	 @Test public void fetchByIdPass() { 
		 Mockito
	        .when(controller.fetchById(5L)).thenReturn(preparePersonRecords().get(0));
			Person personById = preparePersonRecords().get(0);
			Person personByIdFromController = controller.fetchById(5L);
			
			Assertions.assertEquals(personById.getId(), personByIdFromController.getId());
        Assertions.assertEquals(personById.getName(), personByIdFromController.getName());
	 }

	 @Test public void fetchByIdFailure() { 
		 Mockito
	        .when(controller.fetchById(5L)).thenReturn(preparePersonRecords().get(0));
			Person personById = preparePersonRecords().get(1);
			Person personByIdFromController = controller.fetchById(5L);
			
			Assertions.assertNotEquals(personById.getId(), personByIdFromController.getId());
        Assertions.assertNotEquals(personById.getName(), personByIdFromController.getName());
	 }
	 
	 @Test
	 public void deletePass() { 
		 controller.delete(5L);
		 Assertions.assertTrue(true); // This line will be executed only if there is no error in calling the controller for delete as there is no return value.
	 }

	@Test
	public void createPass() {
		Person personToBeCreated 			= preparePersonRecords().get(0);
		Person personReturned = preparePersonRecords().get(0);
		personReturned.setId(7L); //Changed the ID.
		
		Mockito
			.when(controller.create(personToBeCreated)).thenReturn(personReturned);
		
        Person personFromController  = controller.create(personToBeCreated);
		Assertions.assertNotEquals(personToBeCreated.getId(), personFromController.getId()); //Since Id of created one is mocked as changed from within serviceid, it cannot be equal.
        Assertions.assertEquals(personToBeCreated.getName(), personFromController.getName());
}
	
	@Test
	public void createFailure() {
		Person personToBeCreated 			= preparePersonRecords().get(0);
		Person personReturned 			= null; // Intentionally left to null to fail the case. 
				
		Mockito
			.when(controller.create(personToBeCreated)).thenReturn(studentReturned);
		
        Person personFromController  = controller.create(personToBeCreated);
		Assertions.assertNull(personFromController);
	}
	
	/*
	 * @Test public void update() { ResponseEntity<Object> responseObject = null;
	 * 
	 * Mockito.when(controller.update(studentToBeUpdated,
	 * "")).thenReturn(responseObject); }
	 */	
}