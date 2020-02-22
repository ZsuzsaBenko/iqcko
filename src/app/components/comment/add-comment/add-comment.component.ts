import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Puzzle } from '../../../models/Puzzle';
import { PuzzleComment } from '../../../models/PuzzleComment';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() comments: PuzzleComment[];
  @Input() puzzleId: number;

  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const agreement = form.value.agreement;
    if (!agreement) {
      return;
    }

    const message = form.value.message;
    const puzzle = new Puzzle();
    puzzle.id = this.puzzleId;

    const newPuzzleComment = new PuzzleComment();
    newPuzzleComment.message = message;
    newPuzzleComment.puzzle = puzzle;

    this.commentService.addNewComment(newPuzzleComment).subscribe(response => {
      form.reset();
      this.comments.push(response);
    });
  }

}
