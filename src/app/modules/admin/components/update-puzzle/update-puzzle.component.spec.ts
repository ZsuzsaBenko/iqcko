import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ROUTES } from '../../../../models/constants';
import { PuzzleService } from '../../../../services/puzzle.service';
import { activatedRouteMock, testPuzzle } from '../../../../test/test-util.spec';
import { UpdatePuzzleComponent } from './update-puzzle.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

describe('UpdatePuzzleComponent', () => {
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let routerSpy: SpyObj<Router>;

    let component: UpdatePuzzleComponent;
    let fixture: ComponentFixture<UpdatePuzzleComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzleByIdForAdmin', 'updatePuzzle']);
        puzzleServiceSpy.getPuzzleByIdForAdmin.and.returnValue(of(testPuzzle()));
        puzzleServiceSpy.updatePuzzle.and.returnValue(of(testPuzzle()));
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [
                UpdatePuzzleComponent,
                MockNavbarComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy},
                {provide: Router, useValue: routerSpy},
                {provide: ActivatedRoute, useValue: activatedRouteMock()}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(UpdatePuzzleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get puzzle by route id param on init', () => {
        expect(puzzleServiceSpy.getPuzzleByIdForAdmin)
            .toHaveBeenCalledOnceWith(activatedRouteMock().snapshot.params.id);
        expect(component.puzzle).toEqual(testPuzzle());
        expect(component.isPicturePuzzle).toBeTrue();
        expect(component.isCipher).toBeFalse();
    });

    it('should update the puzzle and navigate to the updated puzzle if the form is valid', () => {
        const form = {value: {}, invalid: false} as unknown as NgForm;

        component.onSubmit(form);

        expect(puzzleServiceSpy.updatePuzzle).toHaveBeenCalledOnceWith(testPuzzle().id, testPuzzle());
        expect(routerSpy.navigate).toHaveBeenCalledOnceWith([`${ROUTES.PUZZLES}/${testPuzzle().id}`]);
    });

    it('should not update the puzzle if the form is invalid', () => {
        const form = {value: {}, invalid: true} as unknown as NgForm;

        component.onSubmit(form);

        expect(puzzleServiceSpy.updatePuzzle).not.toHaveBeenCalled();
    });

});

