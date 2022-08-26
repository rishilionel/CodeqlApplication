import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  Name: string; 
  
}