import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { SolutionService } from '../../../../services/solution.service';
import { activatedRouteMock, testPuzzle, testSolution } from '../../../../test/test-util.spec';
import { PuzzleGameComponent } from './puzzle-game.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

@Component({
    selector: 'app-stars',
    template: ''
})
class MockStarsComponent {
    @Input() puzzle!: Puzzle;
}

describe('PuzzleGameComponent', () => {
    const mockLocation = {
        back: (): void => {
            // intentionally left empty
        }
    };
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let solutionServiceSpy: SpyObj<SolutionService>;
    let component: PuzzleGameComponent;
    let fixture: ComponentFixture<PuzzleGameComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getPuzzleById', 'checkAnswer']);
        puzzleServiceSpy.getPuzzleById.and.returnValue(of(testPuzzle()));
        solutionServiceSpy = jasmine.createSpyObj('SolutionService', ['saveSolution']);
        solutionServiceSpy.saveSolution.and.returnValue(of(testSolution()));

        await TestBed.configureTestingModule({
            declarations: [
                PuzzleGameComponent,
                MockNavbarComponent,
                MockStarsComponent
            ],
            imports: [FormsModule],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy},
                {provide: SolutionService, useValue: solutionServiceSpy},
                {provide: ActivatedRoute, useValue: activatedRouteMock()},
                {provide: Location, useValue: mockLocation}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PuzzleGameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get puzzle on init', () => {
        expect(puzzleServiceSpy.getPuzzleById).toHaveBeenCalledWith(activatedRouteMock().snapshot.params.id);
        expect(component.puzzle).toEqual(testPuzzle());
        expect(component.isFetching).toBeFalse();
        expect(component.isIncorrect).toBeFalse();
        expect(component.isSolved).toBeFalse();
    });

    it('should go back if cancelled', () => {
        const locationSpy = spyOn(mockLocation, 'back');

        component.cancel();

        expect(locationSpy).toHaveBeenCalled();
    });

    it('should not check the answer if there is no value', () => {
        const form = {value: {answer: null}} as unknown as NgForm;

        component.checkAnswer(form);

        expect(puzzleServiceSpy.checkAnswer).not.toHaveBeenCalled();
    });

    it('should not check the answer if it\'s empty', () => {
        const form = {value: {answer: ''}} as unknown as NgForm;

        component.checkAnswer(form);

        expect(puzzleServiceSpy.checkAnswer).not.toHaveBeenCalled();
    });

    it('should check the answer and handle the case if it\'s incorrect', fakeAsync(() => {
        const form = {
            value: {answer: 'Incorrect answer'},
            reset: (): void => {
                // intentionally left empty
            }
        } as unknown as NgForm;
        const resetSpy = spyOn(form, 'reset');
        puzzleServiceSpy.checkAnswer.and.returnValue(of(false));

        component.checkAnswer(form);

        expect(puzzleServiceSpy.checkAnswer).toHaveBeenCalled();
        expect(component.isIncorrect).toBeTrue();
        expect(component.isSolved).toBeFalse();
        expect(resetSpy).toHaveBeenCalled();

        tick(5000);

        expect(component.isIncorrect).toBeFalse();
    }));

    it('should check the answer and handle the case if it\'s correct', () => {
        const form = {
            value: {answer: 'Correct answer'},
            reset: (): void => {
                // intentionally left empty
            }
        } as unknown as NgForm;
        const resetSpy = spyOn(form, 'reset');
        puzzleServiceSpy.checkAnswer.and.returnValue(of(true));

        component.checkAnswer(form);

        expect(puzzleServiceSpy.checkAnswer).toHaveBeenCalled();
        expect(component.isIncorrect).toBeFalse();
        expect(component.isSolved).toBeTrue();
        expect(resetSpy).toHaveBeenCalled();
    });

    it('should not send a solution if it\'s not correct yet', () => {
        component.isSolved = false;

        component.sendSolution();

        expect(solutionServiceSpy.saveSolution).not.toHaveBeenCalled();
    });

    it('should send the correct solution', () => {
        const locationSpy = spyOn(mockLocation, 'back');
        component.isSolved = true;

        component.sendSolution();

        expect(solutionServiceSpy.saveSolution).toHaveBeenCalled();
        expect(locationSpy).toHaveBeenCalled();
    });
});
