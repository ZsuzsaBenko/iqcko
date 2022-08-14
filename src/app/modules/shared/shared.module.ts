import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { CommentItemBaseComponent } from './components/comment-item/comment-item-base.component';
import { ProfileCommentItemComponent } from './components/comment-item/profile-comment-item/profile-comment-item.component';
import { SimpleCommentItemComponent } from './components/comment-item/simple-comment-item/simple-comment-item.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PuzzleItemComponent } from './components/puzzle-item/puzzle-item.component';
import { PuzzleSortComponent } from './components/puzzle-sort/puzzle-sort.component';
import { StarsComponent } from './components/stars/stars.component';

@NgModule({
    declarations: [
        AddCommentComponent,
        CommentsComponent,
        CommentItemBaseComponent,
        ConfirmModalComponent,
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
        NgbModalModule,
        NgbRatingModule,
        RouterModule
    ],
    exports: [
        AddCommentComponent,
        CommentsComponent,
        CommentItemBaseComponent,
        ConfirmModalComponent,
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
        NgbModalModule,
        NgbRatingModule,
        RouterModule
    ]
})
export class SharedModule {
}
