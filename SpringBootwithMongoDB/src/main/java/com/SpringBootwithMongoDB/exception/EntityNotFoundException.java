package com.SpringBootwithMongoDB.exception;

public class EntityNotFoundException extends RuntimeException {

	public EntityNotFoundException(String exception) {
		super(exception);
	}

}
