import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsStylesPage } from './components-styles.page';

const routes: Routes = [
  {
    path: '',
    component: ComponentsStylesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsStylesPageRoutingModule {}
