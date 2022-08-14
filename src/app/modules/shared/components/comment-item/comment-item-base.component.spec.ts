import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { CommentService } from '../../../../services/comment.service';
import { testComment } from '../../../../test/test-util.spec';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { CommentItemBaseComponent } from './comment-item-base.component';
import SpyObj = jasmine.SpyObj;

describe('CommentItemBaseComponent', () => {
    let commentServiceSpy: SpyObj<CommentService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: CommentItemBaseComponent;
    let fixture: ComponentFixture<CommentItemBaseComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService', ['deleteComment', 'updateComment']);
        commentServiceSpy.deleteComment.and.returnValue(of(null));
        commentServiceSpy.updateComment.and.returnValue(of(testComment()));
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [CommentItemBaseComponent],
            providers: [
                {provide: CommentService, useValue: commentServiceSpy},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CommentItemBaseComponent);
        component = fixture.componentInstance;
        component.comment = testComment();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle comment edibility', () => {
        expect(component.isEditable).toBeFalse();

        component.toggleEditable();
        expect(component.isEditable).toBeTrue();

        component.toggleEditable();
        expect(component.isEditable).toBeFalse();
    });

    it('should delete the comment if confirmed', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(true)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteComment(testComment().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(commentServiceSpy.deleteComment).toHaveBeenCalledWith(testComment().id);
    });

    it('should not delete the comment if cancelled', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(false)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteComment(testComment().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(commentServiceSpy.deleteComment).not.toHaveBeenCalled();
    });

    it('should update the comment if there is a message', () => {
        const element = {} as unknown as HTMLElement;
        element.textContent = 'Comment text';
        const querySelectorSpy = spyOn(document, 'querySelector').and.returnValue(element);

        component.updateComment(testComment().id);

        expect(querySelectorSpy).toHaveBeenCalled();
        expect(commentServiceSpy.updateComment).toHaveBeenCalled();
    });

    it('should not update the comment if the comment\'s text is empty', () => {
        const element = {} as unknown as HTMLElement;
        element.textContent = '';
        const querySelectorSpy = spyOn(document, 'querySelector').and.returnValue(element);

        component.updateComment(testComment().id);

        expect(querySelectorSpy).toHaveBeenCalled();
        expect(commentServiceSpy.updateComment).not.toHaveBeenCalled();
    });

    it('should not update the comment if the html element cannot be found', () => {
        const querySelectorSpy = spyOn(document, 'querySelector').and.returnValue(null);

        component.updateComment(testComment().id);

        expect(querySelectorSpy).toHaveBeenCalled();
        expect(commentServiceSpy.updateComment).not.toHaveBeenCalled();
    });
});
