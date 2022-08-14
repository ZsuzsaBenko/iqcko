import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { of } from 'rxjs';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testPuzzles } from '../../../../test/test-util.spec';
import { RandomPuzzlesComponent } from './random-puzzles.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-stars',
    template: ''
})
class MockStarsComponent {
    @Input() puzzle!: Puzzle;
}

describe('RandomPuzzlesComponent', () => {
    let puzzleServiceSpy: SpyObj<PuzzleService>;

    let component: RandomPuzzlesComponent;
    let fixture: ComponentFixture<RandomPuzzlesComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getRandomPuzzles']);
        puzzleServiceSpy.getRandomPuzzles.and.returnValue(of(testPuzzles()));

        await TestBed.configureTestingModule({
            declarations: [
                RandomPuzzlesComponent,
                MockStarsComponent
            ],
            imports: [
                FontAwesomeModule,
                RouterTestingModule
            ],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(RandomPuzzlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get random puzzles on init', () => {
        expect(puzzleServiceSpy.getRandomPuzzles).toHaveBeenCalled();
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.currentPuzzle).toEqual(testPuzzles()[0]);
        expect(component.hasPrevious).toBeFalse();
        expect(component.hasNext).toBeTrue();
    });

    it('should step right if we aren\'t at the end of the puzzles array', () => {
        component.stepRight();

        expect(component.hasPrevious).toBeTrue();
        expect(component.hasNext).toBeTrue();
        expect(component.currentPuzzle.id).toEqual(testPuzzles()[1].id);
    });

    it('should not step right if we are at the end of the puzzles array', () => {
        component.stepRight();
        component.stepRight();

        expect(component.hasPrevious).toBeTrue();
        expect(component.hasNext).toBeFalse();
        expect(component.currentPuzzle.id).toEqual(testPuzzles()[2].id);
    });

    it('should step left if we aren\'t at the beginning of the puzzles array', () => {
        component.stepRight();
        component.stepRight();

        component.stepLeft();

        expect(component.hasPrevious).toBeTrue();
        expect(component.hasNext).toBeTrue();
        expect(component.currentPuzzle.id).toEqual(testPuzzles()[1].id);
    });

    it('should not step left if we are at the beginning of the puzzles array', () => {
        component.stepLeft();

        expect(component.hasPrevious).toBeFalse();
        expect(component.hasNext).toBeTrue();
        expect(component.currentPuzzle.id).toEqual(testPuzzles()[0].id);
    });
});
