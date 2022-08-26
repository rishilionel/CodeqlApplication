import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonController } from '../controllers/person.controller';
import { PersonService } from '../services/person.service';
import { PersonRepo } from '../repository/person.repo';
import { Person, PersonSchema } from '../schemas/person.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])
    ],
    controllers: [PersonController],
    providers: [PersonService, PersonRepo],
    exports: [PersonService, PersonRepo]
  })
  export class PersonModule { }