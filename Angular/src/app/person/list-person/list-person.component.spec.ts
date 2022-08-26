import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { PersonService } from "../person.service";
import { ListPersonComponent } from "./list-person.component";
import { Person } from "../person";

describe("ListPersonComponent", () => {
  let mockpaginator: any;
  let mockdata: Person[] = [];
  let mockPersonService: any;
  let fixture: ComponentFixture<ListPersonComponent>;
  let component: ListPersonComponent;

  beforeEach(() => {
    mockdata = [
      {
        Name: "Name",
      },
    ];

    mockPersonService = jasmine.createSpyObj(["getPerson", "deletePerson"]);
    mockpaginator = jasmine.createSpyObj("MatPaginator", ["pageIndex"]);

    TestBed.configureTestingModule({
      declarations: [ListPersonComponent],
      providers: [
        {
          provide: PersonService,
          useValue: mockPersonService,
        },
      ],
    });

    fixture = TestBed.createComponent(ListPersonComponent);
    component = fixture.componentInstance;
  });

  it("should get all the Persons", async () => {
    mockPersonService.getPerson.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toBe(mockdata);
  });

  describe("delete", () => {
    beforeEach(() => {
      mockPersonService.deletePerson.and.returnValue(of(true));
      component.dataSource.data = mockdata;
      component.paginator = mockpaginator;
    });

    it("should delete the Person by id", () => {
      component.delete(0, 0);
      expect(component.data.length).toBe(0);
    });
  });
});
