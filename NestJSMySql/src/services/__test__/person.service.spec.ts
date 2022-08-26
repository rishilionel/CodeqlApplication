import { Person } from "src/entities/person.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PersonService } from "src/services/person.service";
import { Test } from "@nestjs/testing";
import { Repository } from "typeorm";

describe("PersonService", () => {
  let service: PersonService;
  let repo: Repository<Person>;

  const singlePerson: Person = {
    id: 1,

    Name: "rapidx",

  };

  const multiplePeople: Person[] = [
    {
      id: 1,

      Name: "rapidx",

    }
  ];


  beforeEach(async () => {
    const mockRepo = {
      find: () => Promise.resolve(multiplePeople),
      findOne: (id: number) => Promise.resolve(singlePerson),
      save: (Person: Person) => Promise.resolve(Person),
      create: (Person: Person) => Person,
      remove: (Person: Person) => Promise.resolve(Person),
    };

    const module = await Test.createTestingModule({
      providers: [
        PersonService,
        {
          provide: getRepositoryToken(Person),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get(PersonService);
    repo = module.get(getRepositoryToken(Person));
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  describe("fetchAll", () => {
    it("should fetch all People from database", async () => {
      const People = await service.fetchAll();
      expect(People.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should fetch one Person from the database", async () => {
      const Person = await service.fetchOne(1);

      expect(Person.Name).toEqual(singlePerson.Name);

    });
    it("should fetch no People from database", async () => {
      repo.findOne = () => Promise.resolve(null);
      const Person = await service.fetchOne(1);
      expect(Person).toBeNull();
    });
  });

  describe("Create Person", () => {
    it("should create the Person of the specified values", async () => {
      const Person = await service.create(singlePerson);

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });

  describe("Update Person", () => {
    it("should return null when Person is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const Person = await service.update(1, {});
      expect(Person).toBeNull();
    });

    it("should update the Person of the specified id", async () => {
      const Person = await service.update(1, singlePerson);

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });

  describe("Delete Person", () => {
    it("should return null when Person is not available", async () => {
      repo.findOne = () => Promise.resolve(null);
      const Person = await service.delete(1);
      expect(Person).toBeNull();
    });

    it("should delete the Person of the specified id", async () => {
      const Person = await service.delete(1);
      expect(Person.id).toEqual(1);
    });
  });
});
