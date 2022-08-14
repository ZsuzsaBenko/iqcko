import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { CommentService } from '../../../../../services/comment.service';
import { testComment } from '../../../../../test/test-util.spec';
import { ProfileCommentItemComponent } from './profile-comment-item.component';
import SpyObj = jasmine.SpyObj;

describe('ProfileCommentItemComponent', () => {
    let commentServiceSpy: SpyObj<CommentService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: ProfileCommentItemComponent;
    let fixture: ComponentFixture<ProfileCommentItemComponent>;

    beforeEach(async () => {
        commentServiceSpy = jasmine.createSpyObj('CommentService', ['deleteComment', 'updateComment']);
        commentServiceSpy.deleteComment.and.returnValue(of(null));
        commentServiceSpy.updateComment.and.returnValue(of(testComment()));
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [ProfileCommentItemComponent],
            imports: [
                FontAwesomeModule,
                RouterTestingModule
            ],
            providers: [
                {provide: CommentService, useValue: commentServiceSpy},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProfileCommentItemComponent);
        component = fixture.componentInstance;
        component.comment = testComment();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should check whether the user has ADMIN role on init', () => {
        expect(component.isAdmin).toBeFalse();
    });
});
