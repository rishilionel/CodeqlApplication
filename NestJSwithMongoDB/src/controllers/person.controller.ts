import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PersonDto } from '../dto/person-dto.dto';
import { PersonService } from '../services/person.service';


@Controller('Person')
export class PersonController {
    constructor(private readonly personService: PersonService) { }

    @Post()
    async create(@Body() personDto: PersonDto) {
        const res = this.personService.create(personDto);
        return res;
    }

    @Get()
    async findAll() {
        return this.personService.findAll();
    }

    @Post('/:id')
    update(@Param('id') id: string, @Body() personDto: PersonDto) {
        return this.personService.update(id, personDto);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.personService.delete(id);
    }
}