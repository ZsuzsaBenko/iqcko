import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { Category } from '../../../../models/enums';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testPuzzles } from '../../../../test/test-util.spec';
import { PuzzleSortComponent } from './puzzle-sort.component';
import SpyObj = jasmine.SpyObj;

describe('PuzzleSortComponent', () => {
    const form = {value: {sort: 'titleASC'}} as unknown as NgForm;
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let component: PuzzleSortComponent;
    let fixture: ComponentFixture<PuzzleSortComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['getSortedPuzzles']);
        puzzleServiceSpy.getSortedPuzzles.and.returnValue(of(testPuzzles()));

        await TestBed.configureTestingModule({
            declarations: [PuzzleSortComponent],
            imports: [FormsModule],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PuzzleSortComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should send sort request without category', () => {
        component.category = null;
        const emitterSpy = spyOn(component.puzzlesSorted, 'emit');

        component.onSubmit(form);

        expect(puzzleServiceSpy.getSortedPuzzles).toHaveBeenCalledWith(null, 'titleASC');
        expect(emitterSpy).toHaveBeenCalledWith(testPuzzles());
    });

    it('should send sort request with category', () => {
        component.category = Category.MATH_PUZZLE;
        const emitterSpy = spyOn(component.puzzlesSorted, 'emit');

        component.onSubmit(form);

        expect(puzzleServiceSpy.getSortedPuzzles).toHaveBeenCalledWith(Category.MATH_PUZZLE, 'titleASC');
        expect(emitterSpy).toHaveBeenCalledWith(testPuzzles());
    });

    it('should not sort puzzles if there is no sorting parameter chosen', () => {
        form.value.sort = null;

        component.onSubmit(form);

        expect(puzzleServiceSpy.getSortedPuzzles).not.toHaveBeenCalled();
    });
});
