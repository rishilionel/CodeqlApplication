import { Test } from "@nestjs/testing";
import { PersonService } from "src/services/person.service";
import { PersonController } from "src/controllers/person.controller";
import { Person } from "src/entities/person.entity";

describe("PersonController", () => {
  let controller: PersonController;
  let service: PersonService;

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
    const mockService = {
      fetchAll: () => Promise.resolve(multiplePeople),
      fetchOne: (id: number) => Promise.resolve(singlePerson),
      create: (Person: Person) => Promise.resolve(Person),
      delete: (id: number) => Promise.resolve(singlePerson),
      update: (id: number, Person: Partial<Person>) => Promise.resolve(Person),
    };

    const module = await Test.createTestingModule({
      controllers: [PersonController],
      providers: [
        {
          provide: PersonService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get(PersonController);
    service = module.get(PersonService);
  });

  describe("fetchAll", () => {
    it("should fetch all People", async () => {
      const People = await controller.fetchAll();
      expect(People.length).toBeGreaterThan(0);
    });
  });

  describe("fetchOne", () => {
    it("should throw not found exception for the given id", async () => {
      service.fetchOne = (id: number) => Promise.resolve(null);
      await expect(controller.fetchOne("1")).rejects.toThrow();
    });

    it("should return one Person for the given id", async () => {
      const Person = await controller.fetchOne("1");

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });

  describe("Create Person", () => {
    it("should create a Person", async () => {
      const Person = await controller.create(singlePerson);

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });

  describe("Update Person", () => {
    it("should throw not found exception for the given id", async () => {
      service.update = (id: number, Person: Partial<Person>) => Promise.resolve(null);
      await expect(controller.update("1", singlePerson)).rejects.toThrow();
    });

    it("should return one Person for the given id", async () => {
      const Person = await controller.update("1", singlePerson);

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });

  describe("Delete Person", () => {
    it("should throw not found exception for the given id", async () => {
      service.delete = (id: number) => Promise.resolve(null);
      await expect(controller.delete("1")).rejects.toThrow();
    });

    it("should return one Person for the given id", async () => {
      const Person = await controller.delete("1");

      expect(Person.Name).toEqual(singlePerson.Name);

    });
  });
});
