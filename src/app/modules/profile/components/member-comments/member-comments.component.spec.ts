import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommentService } from '../../../../services/comment.service';
import { testComments, testMember } from '../../../../test/test-util.spec';
import { MemberCommentsComponent } from './member-comments.component';
import SpyObj = jasmine.SpyObj;

describe('MemberCommentsComponent', () => {
    let commentServiceSpy: SpyObj<CommentService>;
    let component: MemberCommentsComponent;
    let fixture: ComponentFixture<MemberCommentsComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService',
            ['getAllCommentsByMember', 'getLatestCommentsByLoggedInMember']);
        commentServiceSpy.getAllCommentsByMember.and.returnValue(of(testComments()));
        commentServiceSpy.getLatestCommentsByLoggedInMember.and.returnValue(of(testComments()));

        await TestBed.configureTestingModule({
            declarations: [MemberCommentsComponent],
            providers: [
                {provide: CommentService, useValue: commentServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MemberCommentsComponent);
        component = fixture.componentInstance;
        component.member = testMember();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle the comments\' visibility', () => {
        component.toggleVisible();
        expect(component.isVisible).toBeTrue();

        component.toggleVisible();
        expect(component.isVisible).toBeFalse();
    });

    it('should get all comments by member when toggled visible and not yet loaded', () => {
        component.isAdminPage = true;

        component.toggleVisible();

        expect(commentServiceSpy.getAllCommentsByMember).toHaveBeenCalledWith(testMember().id);
        expect(component.commentsLoaded).toBeTrue();
    });

    it('should get latest comments by logged-in member when toggled visible and not yet loaded', () => {
        component.isAdminPage = false;

        component.toggleVisible();

        expect(commentServiceSpy.getLatestCommentsByLoggedInMember).toHaveBeenCalled();
        expect(component.commentsLoaded).toBeTrue();
    });

    it('should not send request for comments more than once', () => {
        component.isAdminPage = false;

        component.toggleVisible();
        component.toggleVisible();
        component.toggleVisible();

        expect(commentServiceSpy.getLatestCommentsByLoggedInMember).toHaveBeenCalledTimes(1);
    });

    it('should remove the deleted comment from the comments array', () => {
        const deletedComment = component.comments[0];

        component.onCommentDeleted(deletedComment);

        expect(component.comments.find(comment => comment.id === deletedComment.id)).toBeFalsy();
    });
});
