import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarsComponent } from './stars/stars.component';
import { RouterModule } from '@angular/router';
import { AddCommentComponent } from './comment/add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { CommentItemBaseComponent } from './comment/comment-item/comment-item-base.component';
import { SimpleCommentItemComponent } from './comment/comment-item/simple-comment-item/simple-comment-item.component';
import { ProfileCommentItemComponent } from './comment/comment-item/profile-comment-item/profile-comment-item.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { PuzzleItemComponent } from './puzzle-item/puzzle-item.component';
import { PuzzleSortComponent } from './puzzle-sort/puzzle-sort.component';

@NgModule({
  declarations: [
    AddCommentComponent,
    CommentComponent,
    CommentItemBaseComponent,
    NavbarComponent,
    ProfileCommentItemComponent,
    PuzzleItemComponent,
    PuzzleSortComponent,
    SimpleCommentItemComponent,
    StarsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RatingModule,
    RouterModule,
  ],
  exports: [
    AddCommentComponent,
    CommentComponent,
    CommentItemBaseComponent,
    NavbarComponent,
    ProfileCommentItemComponent,
    PuzzleItemComponent,
    PuzzleSortComponent,
    SimpleCommentItemComponent,
    StarsComponent,
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    RatingModule,
    RouterModule,
  ]
})
export class SharedModule {
}
