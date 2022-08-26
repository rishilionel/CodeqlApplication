import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Person } from "src/entities/person.entity";
import { PersonService } from "src/services/person.service";

@Controller("/person")
export class PersonController {
  constructor(private PersonService: PersonService) {}

  @Get("")
  fetchAll() {
    return this.PersonService.fetchAll();
  }

  @Get("/:id")
  async fetchOne(@Param("id") id: string) {
    const Person = await this.PersonService.fetchOne(+id);

    if (!Person) throw new NotFoundException("Person not found");

    return Person;
  }

  @Post()
  create(@Body() Person: Person) {
    return this.PersonService.create(Person);
  }

  @Patch("/:id")
  async update(@Param("id") id: string, @Body() Person: Partial<Person>) {
    const receivedPerson = await this.PersonService.update(+id, Person);

    if (!receivedPerson) throw new NotFoundException("Person not found");

    return receivedPerson;
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const receivedPerson = await this.PersonService.delete(+id);

    if (!receivedPerson) throw new NotFoundException("Person not found");

    return receivedPerson;
  }
}