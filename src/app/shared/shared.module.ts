import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './components/components.module';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
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
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class SharedModule { }
