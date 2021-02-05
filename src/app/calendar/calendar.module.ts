import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { ChunkPipe } from '../pipe/chunkpipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModal } from '../modal/modal.component';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarComponent,
    ChunkPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [NgbdModal,
    FormBuilder,
    NgForm],
  bootstrap: [CalendarComponent]
})
export class CalendarModule { }
