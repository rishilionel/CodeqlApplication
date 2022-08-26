import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Person } from "../person";
import { PersonService } from "../person.service";

@Component({
  selector: "app-edit-person",
  templateUrl: "./edit-person.component.html",
  styleUrls: ["./edit-person.component.css"],
})
export class EditPersonComponent implements OnInit {
  data!: Person;
  id!: any;
  form!: FormGroup;
  private sub!: Subscription;

  constructor(
    public fb: FormBuilder,
    private _router: Router,
    public service: PersonService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id = this.actRoute.snapshot.params["id"];
    this.service.getPersonById(id).subscribe((data: Person) => {
      this.data = data;
    });
    this.update();
  }

  update() {
    this.form = new FormGroup({
      Name: new FormControl("", [Validators.required]),
    });
  }

  edit() {
    if (this.form.valid) {
      var id = this.actRoute.snapshot.params["id"];
      this.service.editPerson(id, this.form.value).subscribe((res) => {
        this._router.navigate(["/list-person/"]);
      });
    }
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
