import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { PuzzleComment } from '../../../../models/interfaces';
import { CommentService } from '../../../../services/comment.service';
import { testComment, testComments } from '../../../../test/test-util.spec';
import { AddCommentComponent } from './add-comment.component';
import SpyObj = jasmine.SpyObj;

describe('AddCommentComponent', () => {
    const form = {
        value: {agreement: true, message: 'New comment!'},
        reset: (): void => {
            // intentionally left empty
        }
    } as unknown as NgForm;
    let commentServiceSpy: SpyObj<CommentService>;
    let component: AddCommentComponent;
    let fixture: ComponentFixture<AddCommentComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService', ['saveComment']);
        commentServiceSpy.saveComment.and.returnValue(of(testComment()));

        await TestBed.configureTestingModule({
            declarations: [AddCommentComponent],
            imports: [FormsModule],
            providers: [
                {provide: CommentService, useValue: commentServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddCommentComponent);
        component = fixture.componentInstance;
        component.comments = testComments();
        component.puzzleId = 1;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save a new comment', () => {
        const newComment = {message: 'New comment!', puzzle: {id: 1}} as unknown as PuzzleComment;

        component.onSubmit(form);

        expect(commentServiceSpy.saveComment).toHaveBeenCalledWith(newComment);
        expect(component.comments.length).toEqual(testComments().length + 1);
    });

    it('should not save the new comment without an accepted agreement', () => {
        form.value.agreement = null;

        component.onSubmit(form);

        expect(commentServiceSpy.saveComment).not.toHaveBeenCalled();
    });

    it('should not save the new comment if it has no text content', () => {
        form.value.agreement = true;
        form.value.message = '';

        component.onSubmit(form);

        expect(commentServiceSpy.saveComment).not.toHaveBeenCalled();
    });
});
