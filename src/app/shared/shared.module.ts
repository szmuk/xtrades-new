import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { LazyImgDirective } from './directives/img-lazy-load/img-lazy-load.directive';


@NgModule({
  declarations: [
    LazyImgDirective,
  ],
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    ComponentsModule,
    MenuComponent,
    HeaderComponent,
    LazyImgDirective,
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class SharedModule { }
