import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../../services/comment.service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PuzzleComment } from '../../../models/PuzzleComment';

import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.css']
})
export class MyCommentsComponent implements OnInit {
  isAdmin = false;
  isVisible = false;
  isEditable = -1;
  comments: PuzzleComment[];
  errorMessage = '';
  faEdit = faEdit;
  faTrash = faTrash;

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

  deleteComment(id: number) {
    if (!confirm('Biztosan törölni akarod ezt a hozzászólást?')) {
      return;
    }

    this.commentService.deleteComment(id).subscribe( () => {
      console.log(`Comment with id ${id} deleted.`);
    },
      error => {
      this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
  }

  toggleEditable(index: number) {
    this.isEditable = this.isEditable < 0 ? this.isEditable = index : -1;
  }

  editComment(id: number) {
    this.isEditable = -1;
    const index = this.comments.findIndex(comment => comment.id === id);
    const editedComment = this.comments[index];
    const message = document.getElementById(`messageText${id}`).textContent;

    editedComment.message = message.trim();

    this.sendUpdate(id, editedComment);
  }

  private sendUpdate(id: number, editedComment: PuzzleComment) {
    this.commentService.editComment(id, editedComment).subscribe( (result) => {
        editedComment = result;
      },
      error => {
        console.log(error);
        this.errorMessage = this.errorHandlerService.handleHttpErrorResponse(error);
      });
  }
}
