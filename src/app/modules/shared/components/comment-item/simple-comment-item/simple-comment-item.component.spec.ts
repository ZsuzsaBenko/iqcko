import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { CommentService } from '../../../../../services/comment.service';
import { testComment } from '../../../../../test/test-util.spec';
import { SimpleCommentItemComponent } from './simple-comment-item.component';
import SpyObj = jasmine.SpyObj;

describe('SimpleCommentItemComponent', () => {
    let commentServiceSpy: SpyObj<CommentService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: SimpleCommentItemComponent;
    let fixture: ComponentFixture<SimpleCommentItemComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService', ['deleteComment', 'updateComment']);
        commentServiceSpy.deleteComment.and.returnValue(of(null));
        commentServiceSpy.updateComment.and.returnValue(of(testComment()));
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [SimpleCommentItemComponent],
            imports: [FontAwesomeModule],
            providers: [
                {provide: CommentService, useValue: commentServiceSpy},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SimpleCommentItemComponent);
        component = fixture.componentInstance;
        component.comment = testComment();
        component.loggedInMember = testComment().member;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check whether the comment belongs to the logged-in member', () => {
        component.ngOnChanges();

        expect(component.isOwnComment).toBeTrue();
    });
});
