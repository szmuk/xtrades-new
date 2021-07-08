import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ComponentsStylesPageRoutingModule } from './components-styles-routing.module';
import { ComponentsStylesPage } from './components-styles.page';


@NgModule({
  imports: [
    SharedModule,
    ComponentsStylesPageRoutingModule
  ],
  declarations: [ComponentsStylesPage]
})
export class ComponentsStylesPageModule {}
