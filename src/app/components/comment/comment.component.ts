import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../services/comment.service';
import { PuzzleComment } from '../../models/PuzzleComment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: PuzzleComment[];
  puzzleId: number;
  isFetching = true;

  constructor(private commentService: CommentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const activeUrl = this.activatedRoute.snapshot.url.toString();
    const firstComma = activeUrl.indexOf(',');
    const lastComma = activeUrl.lastIndexOf(',');
    const puzzleId = activeUrl.substring(firstComma + 1, lastComma);
    this.puzzleId = +puzzleId;

    this.commentService.getAllCommentsByPuzzle(this.puzzleId).subscribe(comments => {
      this.comments = comments;
      this.isFetching = false;
    });
  }

}
