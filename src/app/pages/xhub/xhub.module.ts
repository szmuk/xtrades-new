import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { XhubPageRoutingModule } from './xhub-routing.module';
import { XhubPage } from './xhub.page';

@NgModule({
  imports: [
    SharedModule,
    XhubPageRoutingModule
  ],
  declarations: [XhubPage]
})
export class XhubPageModule { }
