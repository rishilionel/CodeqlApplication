import { Component, ViewChild, OnInit } from "@angular/core";
import { PersonService } from "../person.service";
import { Person } from "../person";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-list-person",
  templateUrl: "./list-person.component.html",
  styleUrls: ["./list-person.component.css"],
})
export class ListPersonComponent implements OnInit {
  data: Person[] = [];
  dataSource = new MatTableDataSource<Person>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = ["Name", "action"];

  constructor(public service: PersonService) {}

  ngOnInit(): void {
    this.service.getPerson().subscribe((data: Person[]) => {
      this.data = data;
      this.dataSource = new MatTableDataSource<Person>(this.data);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }

  delete(index: number, id: number) {
    const data = this.dataSource.data;
    data.splice(this.paginator.pageIndex * this.paginator.pageSize + index, 1);
    this.dataSource.data = data;
    this.service.deletePerson(id).subscribe();
  }
}
