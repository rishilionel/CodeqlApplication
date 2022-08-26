import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { PersonService } from "../person.service";
import { AddPersonComponent } from "./add-person.component";

describe("AddPersonComponent", () => {
  let mockrouter: any;
  let mockPersonService: any;
  let fixture: ComponentFixture<AddPersonComponent>;
  let component: AddPersonComponent;

  beforeEach(() => {
    mockPersonService = jasmine.createSpyObj(["addPerson"]);
    mockrouter = jasmine.createSpyObj("Router", ["navigate"]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AddPersonComponent],
      providers: [
        FormBuilder,
        {
          provide: PersonService,
          useValue: mockPersonService,
        },
        {
          provide: Router,
          useValue: mockrouter,
        },
      ],
    });

    fixture = TestBed.createComponent(AddPersonComponent);
    component = fixture.componentInstance;
  });

  describe("add", () => {
    beforeEach(() => {
      mockPersonService.addPerson.and.returnValue(of(true));
      fixture.detectChanges();
    });

    it("should add Person and navigate to list Person", () => {
      component.form.setValue({
        Name: "Name",
      });
      component.add();
      mockrouter.navigate.and.returnValue(Promise.resolve(true));
      expect(mockrouter.navigate).toHaveBeenCalledWith(["/list-person/"]);
    });
  });
});
