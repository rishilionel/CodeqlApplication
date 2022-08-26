package com.SpringBootwithMongoDB.controller;

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

import com.SpringBootwithMongoDB.controller.PersonController;
import com.SpringBootwithMongoDB.entity.Person;
import com.SpringBootwithMongoDB.service.PersonService;

@RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class PersonControllerTest {
	@Mock
	private PersonService service;

	@InjectMocks
	private PersonController controller;
	
	private List<Person> preparePersonRecords(){
		List<Person> personList = new ArrayList<Person>();
		Person person1 = new Person("62d6b821618d9f7c7024ccc5", "24KUA");
		Person person2 = new Person("62d6b821618d9f7c7024ccc4", "dmGhb");
		personList.add(person1);
		personList.add(person2);
		return personList;
	}
	
	@Test
	public void testFetchAllPass() {
		Mockito
        .when(controller.fetchAll()).thenReturn(preparePersonRecords());
		List<Person> personList = preparePersonRecords();
		List<Person> personListFromController =  controller.fetchAll();
		for(int i=0; i<personList.size();i++) {
			Assertions.assertEquals(personList.get(i).getId(), personListFromController.get(i).getId());
            Assertions.assertEquals(personList.get(i).getName(), personListFromController.get(i).getName());
		}
		
	}

	@Test
	public void testFetchAllFailure() {
		Mockito
        .when(controller.fetchAll()).thenReturn(preparePersonRecords());
		List<Person> personList = null; //Intentionally made null to fail the test.
		List<Person> personListFromController =  controller.fetchAll();
		Assertions.assertNotEquals(personList, personListFromController);
	}
	
	
	 @Test public void fetchByIdPass() { 
		 Mockito
	        .when(controller.fetchById("62d6b821618d9f7c7024ccc5"))
            .thenReturn(preparePersonRecords().get(0));

        Person personById = preparePersonRecords().get(0);
        Person personByIdFromController = controller.fetchById("62d6b821618d9f7c7024ccc5");
        
        Assertions.assertEquals(personById.getId(), personByIdFromController.getId());
        Assertions.assertEquals(personById.getName(), personByIdFromController.getName());
		 
	 }

	 @Test public void fetchByIdFailure() { 
		Mockito
	        .when(controller.fetchById("62d6b821618d9f7c7024ccc5"))
            .thenReturn(preparePersonRecords().get(0));

        Person personById = preparePersonRecords().get(1);
        Person personByIdFromController = controller.fetchById("62d6b821618d9f7c7024ccc5");
        
        Assertions.assertNotEquals(personById.getId(), personByIdFromController.getId());
        Assertions.assertNotEquals(personById.getName(), personByIdFromController.getName());
		 
	 }
	 
	 @Test
	 public void deletePass() { 
		 controller.delete("62d6b821618d9f7c7024ccc5");
		 Assertions.assertTrue(true); // This line will be executed only if there is no error in calling the controller for delete as there is no return value.
	 }

	@Test
	public void createPass() {
		Person personToBeCreated 			= preparePersonRecords().get(0);
		Person personReturned = preparePersonRecords().get(0);
		personReturned.setId("62d6b821618d9f7c7024ccc9"); //Changed the ID.
		
		Mockito
			.when(controller.create(personToBeCreated))
            .thenReturn(personReturned);
		
		Person personFromController  = controller.create(personToBeCreated);
		Assertions.assertNotEquals(personToBeCreated.getId(), personFromController.getId()); //Since Id of created one is mocked as changed from within serviceid, it cannot be equal.
        Assertions.assertEquals(personToBeCreated.getName(), personFromController.getName());
	}
	
	@Test
	public void createFailure() {
		Person personToBeCreated = preparePersonRecords().get(0);
		Person personReturned = null; // Intentionally left to null to fail the case. 
				
		Mockito
			.when(controller.create(personToBeCreated))
            .thenReturn(personReturned);
		
		Person personFromController  = controller.create(personToBeCreated);
		Assertions.assertNull(personFromController);
	}
}
