import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonDocument = Person & Document;

@Schema()
export class Person {
   
   @Prop()
   Name: string; 
   
}

export const PersonSchema = SchemaFactory.createForClass(Person);