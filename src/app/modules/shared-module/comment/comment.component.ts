import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../../../services/comment.service';
import { PuzzleComment } from '../../../models/PuzzleComment';
import { Member } from '../../../models/Member';
import { MemberService } from '../../../services/member.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  comments: PuzzleComment[];
  puzzleId: number;
  loggedInMember = new Member();
  isFetching = true;

  constructor(private commentService: CommentService,
              private memberService: MemberService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const urlSegments = this.activatedRoute.snapshot.url.toString();
    const firstComma = urlSegments.indexOf(',');
    const puzzleId = urlSegments.substring(0, firstComma);
    this.puzzleId = +puzzleId;

    this.commentService.getAllCommentsByPuzzle(this.puzzleId).subscribe(comments => {
      this.comments = comments;
      this.isFetching = false;
    });

    this.memberService.getLoggedInMemberProfile().subscribe(member => this.loggedInMember = member);
  }

}
