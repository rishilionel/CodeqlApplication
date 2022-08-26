import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Person } from "src/entities/person.entity";
import { Repository } from "typeorm";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private PersonRepo: Repository<Person>,
  ) {}

  fetchAll() {
    return this.PersonRepo.find();
  }

  fetchOne(id: number) {
    return this.PersonRepo.findOne({
      where: { id },
    });
  }

  create(Person: Person) {
    const newPerson = this.PersonRepo.create(Person);
    return this.PersonRepo.save(newPerson);
  }

  async update(id: number, attrs: Partial<Person>) {
    const Person = await this.fetchOne(id);

    if (!Person) {
      return null;
    }

    Object.assign(Person, attrs);
    return this.PersonRepo.save(Person);
  }

  async delete(id: number) {
    const Person = await this.fetchOne(id);

    if (!Person) {
      return null;
    }

    return this.PersonRepo.remove(Person);
  }
}
