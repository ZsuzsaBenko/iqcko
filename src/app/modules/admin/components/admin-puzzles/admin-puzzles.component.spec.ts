import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Category } from '../../../../models/enums';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testPuzzles } from '../../../../test/test-util.spec';
import { AdminPuzzlesComponent } from './admin-puzzles.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-puzzle-item',
    template: ''
})
class MockPuzzleItemComponent {
    @Input() puzzle!: Puzzle;
}

@Component({
    selector: 'app-puzzle-sort',
    template: ''
})
class MockPuzzleSortComponent {
    @Input() category!: Category;
}

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

describe('AdminPuzzlesComponent', () => {
    let puzzleServiceSpy: SpyObj<PuzzleService>;

    let component: AdminPuzzlesComponent;
    let fixture: ComponentFixture<AdminPuzzlesComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getAllPuzzles']);
        puzzleServiceSpy.getAllPuzzles.and.returnValue(of(testPuzzles()));

        await TestBed.configureTestingModule({
            declarations: [
                AdminPuzzlesComponent,
                MockNavbarComponent,
                MockPuzzleSortComponent,
                MockPuzzleItemComponent
            ],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AdminPuzzlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get all puzzles on init', () => {
        expect(puzzleServiceSpy.getAllPuzzles).toHaveBeenCalled();
        expect(component.puzzles).toEqual(testPuzzles());
    });

    it('should filter puzzles when one of them is deleted', () => {
        component.onPuzzleDeleted(testPuzzles()[1]);

        expect(component.puzzles.length).toEqual(testPuzzles().length - 1);
        expect(component.puzzles.find(puzzle => Category.MATH_PUZZLE === puzzle.category)).toBeUndefined();
    });

    it('should update puzzles when they are sorted', () => {
        const sortedPuzzles = testPuzzles().sort((a, b) =>
            a.rating < b.rating ? 1 : a.rating === b.rating ? 0 : -1);

        component.onPuzzlesSorted(sortedPuzzles);

        expect(component.puzzles).toEqual(sortedPuzzles);
    });
});
