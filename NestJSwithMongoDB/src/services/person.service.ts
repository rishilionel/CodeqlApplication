import { Injectable } from '@nestjs/common';
import { PersonRepo } from '../repository/person.repo';
import { Person } from '../schemas/person.schema';

@Injectable()
export class PersonService {
    constructor(
        private readonly personRepo: PersonRepo
    ) { }

    async findAll(): Promise<Person[]> {
        return this.personRepo.findAll();
    }

    async create(data): Promise<Person> {
        data.createddate = new Date();
        return this.personRepo.create(data);
    }

    async update(personId, data): Promise<Person> {
        return this.personRepo.update(personId, data);
    }

    async delete(personId): Promise<Person> {
        return this.personRepo.delete(personId);
    }
}