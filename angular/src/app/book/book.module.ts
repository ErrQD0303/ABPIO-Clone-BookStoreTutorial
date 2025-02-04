import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookRoutingModule } from "./book-routing.module";
import { BookComponent } from "./book.component";
import { SharedModule } from "../shared/shared.module";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap"; // add this line

@NgModule({
  declarations: [BookComponent],
  imports: [CommonModule, BookRoutingModule, SharedModule, NgbDatepickerModule], // add NgbDatepickerModule
})
export class BookModule {}
