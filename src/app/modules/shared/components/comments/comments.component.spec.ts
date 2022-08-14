import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Member, PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';
import { MemberService } from '../../../../services/member.service';
import { activatedRouteMock, testComments, testMember } from '../../../../test/test-util.spec';
import { CommentsComponent } from './comments.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

@Component({
    selector: 'app-simple-comment-item',
    template: ''
})
class MockSimpleCommentItemComponent {
    @Input() comment!: PuzzleComment;
    @Input() loggedInMember!: Member;
}

@Component({
    selector: 'app-add-comment',
    template: ''
})
class MockAddCommentComponent {
    @Input() comments!: Array<PuzzleComment>;
    @Input() puzzleId!: number;
}

describe('CommentsComponent', () => {
    let commentServiceSpy: SpyObj<CommentService>;
    let memberServiceSpy: SpyObj<MemberService>;
    let component: CommentsComponent;
    let fixture: ComponentFixture<CommentsComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService', ['getAllCommentsByPuzzle']);
        commentServiceSpy.getAllCommentsByPuzzle.and.returnValue(of(testComments()));
        memberServiceSpy = jasmine.createSpyObj('MemberService', ['getLoggedInMemberProfile']);
        memberServiceSpy.getLoggedInMemberProfile.and.returnValue(of(testMember()));

        await TestBed.configureTestingModule({
            declarations: [
                CommentsComponent,
                MockSimpleCommentItemComponent,
                MockAddCommentComponent,
                MockNavbarComponent
            ],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteMock()},
                {provide: CommentService, useValue: commentServiceSpy},
                {provide: MemberService, useValue: memberServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all comments for the puzzle on init', () => {
        expect(commentServiceSpy.getAllCommentsByPuzzle).toHaveBeenCalled();
    });

    it('should get the logged-in member on init', () => {
        expect(memberServiceSpy.getLoggedInMemberProfile).toHaveBeenCalled();
    });
});
