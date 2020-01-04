import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../../services/comment.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PuzzleComment } from '../../../models/PuzzleComment';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit {
  isAdmin = false;
  isVisible = false;
  comments: PuzzleComment[];
  errorMessage = '';

  constructor(private commentService: CommentService,
              private errorHandlerService: ErrorHandlerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.url.toString().startsWith('admin')) {
      this.commentService.getAllCommentsByMember(this.activatedRoute.snapshot.params.id).subscribe(comments => {
        this.comments = comments;
        this.isAdmin = true;
      },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
    } else {
        this.commentService.getLatestCommentsByLoggedInMember().subscribe(comments => {
          this.comments = comments;
        },
      error => {
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
    }
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }

  refreshComments(deletedComment: PuzzleComment) {
    const index = this.comments.indexOf(deletedComment);
    this.comments.splice(index, 1);
  }
}
