import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testMember, testPuzzles } from '../../../../test/test-util.spec';
import { MemberPuzzlesComponent } from './member-puzzles.component';
import SpyObj = jasmine.SpyObj;

describe('MemberPuzzlesComponent', () => {
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let component: MemberPuzzlesComponent;
    let fixture: ComponentFixture<MemberPuzzlesComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService',
            ['getAllPuzzlesByMember', 'getAllPuzzlesByLoggedInMember']);
        puzzleServiceSpy.getAllPuzzlesByMember.and.returnValue(of(testPuzzles()));
        puzzleServiceSpy.getAllPuzzlesByLoggedInMember.and.returnValue(of(testPuzzles()));

        await TestBed.configureTestingModule({
            declarations: [MemberPuzzlesComponent],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MemberPuzzlesComponent);
        component = fixture.componentInstance;
        component.member = testMember();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle the puzzles\' visibility', () => {
        component.toggleVisible();
        expect(component.isVisible).toBeTrue();

        component.toggleVisible();
        expect(component.isVisible).toBeFalse();
    });

    it('should get all puzzles by member when toggled visible and not yet loaded', () => {
        component.isAdminPage = true;

        component.toggleVisible();

        expect(puzzleServiceSpy.getAllPuzzlesByMember).toHaveBeenCalledWith(testMember().id);
        expect(component.puzzlesLoaded).toBeTrue();
    });

    it('should get all puzzles by logged-in member when toggled visible and not yet loaded', () => {
        component.isAdminPage = false;

        component.toggleVisible();

        expect(puzzleServiceSpy.getAllPuzzlesByLoggedInMember).toHaveBeenCalled();
        expect(component.puzzlesLoaded).toBeTrue();
    });

    it('should not send request for puzzles more than once', () => {
        component.isAdminPage = false;

        component.toggleVisible();
        component.toggleVisible();
        component.toggleVisible();

        expect(puzzleServiceSpy.getAllPuzzlesByLoggedInMember).toHaveBeenCalledTimes(1);
    });

});
