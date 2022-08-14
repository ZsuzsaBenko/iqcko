import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { of } from 'rxjs';
import { ROUTES } from '../../../../models/constants';
import { Category } from '../../../../models/enums';
import { Puzzle } from '../../../../models/interfaces';
import { PuzzleService } from '../../../../services/puzzle.service';
import { SolutionService } from '../../../../services/solution.service';
import { testPuzzles, testSolutions } from '../../../../test/test-util.spec';
import { PuzzlesComponent } from './puzzles.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

@Component({
    selector: 'app-puzzle-sort',
    template: ''
})
class MockPuzzleSortComponent {
    @Input() category!: Category;
}

@Component({
    selector: 'app-puzzle-item',
    template: ''
})
class MockPuzzleItemComponent {
    @Input() puzzle!: Puzzle;
}

describe('PuzzlesComponent', () => {
    let activatedRouteSpy: SpyObj<ActivatedRoute>;
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let solutionServiceSpy: SpyObj<SolutionService>;
    let component: PuzzlesComponent;
    let fixture: ComponentFixture<PuzzlesComponent>;

    beforeEach(async () => {
        activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
        activatedRouteSpy.snapshot = {url: []} as unknown as ActivatedRouteSnapshot;
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getAllPuzzles', 'getPuzzlesByCategory']);
        puzzleServiceSpy.getAllPuzzles.and.returnValue(of(testPuzzles()));
        puzzleServiceSpy.getPuzzlesByCategory.and.returnValue(of(testPuzzles()));
        solutionServiceSpy = jasmine.createSpyObj('SolutionService', ['getAllSolutionsByLoggedInMember']);
        solutionServiceSpy.getAllSolutionsByLoggedInMember.and.returnValue(of(testSolutions()));

        await TestBed.configureTestingModule({
            declarations: [
                PuzzlesComponent,
                MockPuzzleSortComponent,
                MockPuzzleItemComponent,
                MockNavbarComponent
            ],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy},
                {provide: SolutionService, useValue: solutionServiceSpy},
                {provide: ActivatedRoute, useValue: activatedRouteSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PuzzlesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.ALL, {})];
        component.ngOnInit();

        expect(component).toBeTruthy();
    });

    it('should load all puzzles on init if no category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.ALL, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getAllPuzzles).toHaveBeenCalled();
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Összes rejtvény');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should load riddles on init if this category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.RIDDLES, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getPuzzlesByCategory).toHaveBeenCalledWith(Category.RIDDLE);
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Fejtörők, találós kérdések');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should load math puzzles on init if this category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.MATH_PUZZLES, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getPuzzlesByCategory).toHaveBeenCalledWith(Category.MATH_PUZZLE);
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Matematikai feladványok');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should load picture puzzles on init if this category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.PICTURE_PUZZLES, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getPuzzlesByCategory).toHaveBeenCalledWith(Category.PICTURE_PUZZLE);
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Képrejtvények');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should load word puzzles on init if this category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.WORD_PUZZLES, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getPuzzlesByCategory).toHaveBeenCalledWith(Category.WORD_PUZZLE);
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Nyelvi játékok');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should load ciphers on init if this category is specified in the url', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.CIPHERS, {})];
        component.ngOnInit();

        expect(puzzleServiceSpy.getPuzzlesByCategory).toHaveBeenCalledWith(Category.CIPHER);
        expect(component.puzzles).toEqual(testPuzzles());
        expect(component.title).toEqual('Titkosírás');
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should update puzzles when sorted', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.ALL, {})];
        component.ngOnInit();
        const sortedPuzzles = testPuzzles()
            .sort((p1, p2) => p1.title < p2.title ? -1 : p1.title === p2.title ? 0 : 1);

        component.onSort(sortedPuzzles);

        expect(component.puzzles).toEqual(sortedPuzzles);
        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
    });

    it('should call for solutions only once when it is sorted repeatedly', () => {
        activatedRouteSpy.snapshot.url = [new UrlSegment(ROUTES.PUZZLE_CATEGORIES.WORD_PUZZLES, {})];
        component.ngOnInit();
        const sortedPuzzles = testPuzzles()
            .sort((p1, p2) => p1.title < p2.title ? -1 : p1.title === p2.title ? 0 : 1);

        component.onSort(sortedPuzzles);
        component.onSort(sortedPuzzles);
        component.onSort(sortedPuzzles);

        expect(solutionServiceSpy.getAllSolutionsByLoggedInMember).toHaveBeenCalledTimes(1);
    });
});
