package com.SpringBootwithMongoDB.entity;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Person")
public class Person {

	@Id
	private String id;
    private String Name;

	public Person(String id, 
        String Name
    ){
    this.id = id;
	this.Name = Name;
	}

    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

    public void setName(String Name){
        this.Name = Name;
    }

    public String getName(){
        return this.Name;
    }

    public String toString(){
        return "[id = " + this.id +
                "Name = " + this.Name +
            "]";
    }

}
