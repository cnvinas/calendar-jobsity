import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModal } from './modal.component';

@NgModule({
  imports: [BrowserModule, NgbModule],
  declarations: [NgbdModal],
  exports: [NgbdModal],
  bootstrap: [NgbdModal]
})
export class NgbdModalModule {}