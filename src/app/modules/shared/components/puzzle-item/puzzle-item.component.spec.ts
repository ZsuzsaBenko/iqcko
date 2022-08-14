import { UpperCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { ROUTES } from '../../../../models/constants';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testPuzzle } from '../../../../test/test-util.spec';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { PuzzleItemComponent } from './puzzle-item.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-stars',
    template: ''
})
class MockStarsComponent {
    @Input() puzzle!: Puzzle;
}

describe('PuzzleItemComponent', () => {
    const mockActivatedRoute = {snapshot: {url: `${ROUTES.PUZZLES}`}};
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: PuzzleItemComponent;
    let fixture: ComponentFixture<PuzzleItemComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['deletePuzzle']);
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [
                PuzzleItemComponent,
                MockStarsComponent,
                UpperCasePipe
            ],
            imports: [
                FontAwesomeModule,
                RouterTestingModule
            ],
            providers: [
                {provide: ActivatedRoute, useValue: mockActivatedRoute},
                {provide: PuzzleService, useValue: puzzleServiceSpy},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PuzzleItemComponent);
        component = fixture.componentInstance;
        component.puzzle = testPuzzle();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete the puzzle if confirmed', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(true)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);
        puzzleServiceSpy.deletePuzzle.and.returnValue(of(null));

        component.deletePuzzle(testPuzzle().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(puzzleServiceSpy.deletePuzzle).toHaveBeenCalledWith(testPuzzle().id);
    });

    it('should not delete the puzzle if cancelled', () => {
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(false)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deletePuzzle(testPuzzle().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(puzzleServiceSpy.deletePuzzle).not.toHaveBeenCalled();
    });
});
