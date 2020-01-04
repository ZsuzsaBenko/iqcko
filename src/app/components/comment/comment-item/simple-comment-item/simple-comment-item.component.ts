import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../../../../services/auth.service';
import { CommentService } from '../../../../services/comment.service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { PuzzleComment } from '../../../../models/PuzzleComment';
import { CommentItemBaseComponent } from '../comment-item-base.component';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'app-simple-comment-item',
  templateUrl: './simple-comment-item.component.html',
  styleUrls: ['./simple-comment-item.component.css']
})
export class SimpleCommentItemComponent extends CommentItemBaseComponent implements OnInit {
  @Input() comment: PuzzleComment;
  isOwnComment: boolean;
  faEdit = faEdit;

  constructor(public commentService: CommentService,
              public errorHandlerService: ErrorHandlerService) {
    super(commentService, errorHandlerService);
  }

  ngOnInit() {
    this.isOwnComment = this.comment.member.email === AuthService.getLoggedInMemberEmail();
  }

}
