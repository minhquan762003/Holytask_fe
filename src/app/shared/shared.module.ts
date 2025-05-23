import { NgModule } from '@angular/core';
import {CommonModule, NgFor, NgForOf} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgForOf,
    FormsModule,
    RouterOutlet,
    NgFor,
    RouterLink,
    NgxPaginationModule,
    ToastrModule,
  ],
  exports:[
    CommonModule,
    NgForOf,
    FormsModule,
    RouterOutlet,
    NgFor,
    RouterLink,
    NgxPaginationModule,
    ToastrModule,
  ]
})
export class SharedModule { }
