import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CommentService } from '../../../../services/comment.service';
import { PuzzleComment } from '../../../../models/PuzzleComment';

@Component({
  selector: 'app-comment-item-base',
  template: ''
})
export class CommentItemBaseComponent implements OnInit {
  @Output() commentDeleted = new EventEmitter<PuzzleComment>();
  comment: PuzzleComment;
  isEditable = false;

  constructor(public commentService: CommentService) {
  }

  ngOnInit() {
  }

  deleteComment(id: number) {
    if (!confirm('Biztosan törölni akarod ezt a hozzászólást?')) {
      return;
    }

    this.commentService.deleteComment(id).subscribe(() => {
      this.commentDeleted.emit(this.comment);
    });
  }

  toggleEditable() {
    this.isEditable = !this.isEditable;
  }

  editComment(id: number) {
    this.isEditable = false;
    const message = document.querySelector(`.messageText${id}`).textContent;
    this.comment.message = message.trim();
    this.sendUpdate(id, this.comment);
  }

  private sendUpdate(id: number, editedComment: PuzzleComment) {
    this.commentService.editComment(id, editedComment).subscribe((result) => {
      editedComment = result;
    });
  }

}
