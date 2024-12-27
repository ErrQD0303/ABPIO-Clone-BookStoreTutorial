import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { AuthorRoutingModule } from "./author-routing.module";
import { AuthorComponent } from "./author.component";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap"; // add this line

@NgModule({
  declarations: [AuthorComponent],
  imports: [CommonModule, AuthorRoutingModule, SharedModule, NgbDatepickerModule], // add NgbDatepickerModule
})
export class AuthorModule {}
