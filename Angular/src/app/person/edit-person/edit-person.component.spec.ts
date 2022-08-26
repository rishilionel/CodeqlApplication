import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { Person } from "../person";
import { PersonService } from "../person.service";
import { EditPersonComponent } from "./edit-person.component";

describe("EditPersonComponent", () => {
  let mockrouter: any;
  let mockActivatedRoute: any;
  let mockdata: Person;
  let mockPersonService: any;
  let component: EditPersonComponent;
  let fixture: ComponentFixture<EditPersonComponent>;

  beforeEach(() => {
    mockdata = {
      Name: "Name",
    };

    mockPersonService = jasmine.createSpyObj(["getPersonById", "editPerson"]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditPersonComponent],
      providers: [
        FormBuilder,
        { provide: PersonService, useValue: mockPersonService },
        {
          provide: ActivatedRoute,
          useValue: (mockActivatedRoute = {
            snapshot: { params: { id: "1" } },
          }),
        },
        { provide: Router, useValue: mockrouter },
      ],
    });
    fixture = TestBed.createComponent(EditPersonComponent);
    component = fixture.componentInstance;
  });

  it("should get the Person by id", () => {
    component.id = mockActivatedRoute.snapshot.params["id"];
    mockPersonService.getPersonById.and.returnValue(of(mockdata));
    fixture.detectChanges();
    expect(component.data).toEqual(mockdata);
  });

  describe("edit", () => {
    beforeEach(() => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      mockPersonService.getPersonById.and.returnValue(of(mockdata));
      mockPersonService.editPerson.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should edit the Person by id", () => {
      component.id = mockActivatedRoute.snapshot.params["id"];
      component.form.setValue({
        Name: "Name",
      });
      component.edit();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-person/"]);
    });
  });
});
