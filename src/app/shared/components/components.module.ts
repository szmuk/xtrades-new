import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CommentComponent } from './comment/comment.component';
import { CommentsListItemComponent } from './comments-list/comments-list-item/comments-list-item.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CompanyLogoComponent } from './company-logo/company-logo.component';
import { HeaderOptionsComponent } from './header/header-options/header-options.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { SortFilterListComponent } from './sort-filter/sort-filter-list/sort-filter-list.component';
import { SortFilterComponent } from './sort-filter/sort-filter.component';
import { TextDuplexComponent } from './text-duplex/text-duplex.component';
import { TraderInfoComponent } from './trader-info/trader-info.component';

@NgModule({
  declarations: [
    SortFilterComponent,
    MenuComponent,
    HeaderComponent,
    SortFilterListComponent,
    CommentComponent,
    TextDuplexComponent,
    HeaderOptionsComponent,
    CommentsListComponent,
    TraderInfoComponent,
    CompanyLogoComponent,
    AlertModalComponent,
    AvatarComponent,
    CommentsListItemComponent,
  ],
  exports: [
    SortFilterComponent,
    MenuComponent,
    HeaderComponent,
    CompanyLogoComponent,
    CommentComponent,
    CommentsListComponent,
    TraderInfoComponent,
    TextDuplexComponent,
    AlertModalComponent,
    AvatarComponent,
    CommentsListItemComponent,
  ],
  entryComponents: [
    SortFilterListComponent,
    HeaderOptionsComponent,
    AlertModalComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
  ]
})
export class ComponentsModule { }
