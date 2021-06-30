import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XhubPage } from './xhub.page';

const routes: Routes = [
  {
    path: '',
    component: XhubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XhubPageRoutingModule {}
