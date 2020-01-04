import { Component, Input, OnInit } from '@angular/core';

import { CommentService } from '../../../../services/comment.service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { AuthService } from '../../../../services/auth.service';
import { PuzzleComment } from '../../../../models/PuzzleComment';
import { CommentItemBaseComponent } from '../comment-item-base.component';

import { faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'app-profile-comment-item',
  templateUrl: './profile-comment-item.component.html',
  styleUrls: ['./profile-comment-item.component.css']
})
export class ProfileCommentItemComponent extends CommentItemBaseComponent implements OnInit {
  @Input() comment: PuzzleComment;
  isAdmin = false;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(public commentService: CommentService,
              public errorHandlerService: ErrorHandlerService) {
    super(commentService, errorHandlerService);
  }

  ngOnInit() {
    this.isAdmin = AuthService.isAdmin();
  }

}
