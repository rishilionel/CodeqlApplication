import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from 'src/schemas/person.schema';

@Injectable()
export class PersonRepo {
    constructor(
        @InjectModel(Person.name)
        private readonly personModel: Model<PersonDocument>) {}

    async create(data): Promise<Person> {
        return new this.personModel(data).save();
    }

    async findAll(): Promise<Person[]> {
        return this.personModel.find({})
            .exec();
    }

    async update(personId, data): Promise<Person> {
        const filter = { _id: personId };
        return this.personModel.findOneAndUpdate(filter, data);
    }

    async delete(personId): Promise<Person> {
        const filter = { _id: personId };
        return this.personModel.findByIdAndDelete(personId);
    }
}