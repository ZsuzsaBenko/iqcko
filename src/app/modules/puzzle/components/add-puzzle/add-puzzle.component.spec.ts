import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ROUTES } from '../../../../models/constants';
import { Category, Level } from '../../../../models/enums';
import { PuzzleService } from '../../../../services/puzzle.service';
import { testPuzzle } from '../../../../test/test-util.spec';
import { AddPuzzleComponent } from './add-puzzle.component';
import SpyObj = jasmine.SpyObj;

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

describe('AddPuzzleComponent', () => {
    let puzzleServiceSpy: SpyObj<PuzzleService>;
    let firebaseStorageSpy: SpyObj<AngularFireStorage>;
    let routerSpy: SpyObj<Router>;
    let component: AddPuzzleComponent;
    let fixture: ComponentFixture<AddPuzzleComponent>;

    beforeEach(async () => {
        puzzleServiceSpy = jasmine.createSpyObj('PuzzleService', ['savePuzzle']);
        puzzleServiceSpy.savePuzzle.and.returnValue(of(testPuzzle()));
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        firebaseStorageSpy = jasmine.createSpyObj('AngularFireStorage', ['ref']);
        firebaseStorageSpy.ref.and.returnValue({
            put: (): AngularFireUploadTask => ({
                then: async (callback: any): Promise<any> => new Promise(callback),
                catch: async (callback: any): Promise<any> => new Promise(callback)
            } as unknown as AngularFireUploadTask),
            getDownloadURL: (): Observable<string> => of('download URL')
        } as unknown as AngularFireStorageReference);

        await TestBed.configureTestingModule({
            declarations: [
                AddPuzzleComponent,
                MockNavbarComponent
            ],
            imports: [FormsModule],
            providers: [
                {provide: PuzzleService, useValue: puzzleServiceSpy},
                {provide: AngularFireStorage, useValue: firebaseStorageSpy},
                {provide: Router, useValue: routerSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AddPuzzleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle if category is chosen', () => {
        let form = {value: {category: Category.PICTURE_PUZZLE}} as unknown as NgForm;

        component.onCategoryChange(form);

        expect(component.isPicturePuzzle).toBeTrue();
        expect(component.isCipher).toBeFalse();

        form = {value: {category: Category.WORD_PUZZLE}} as unknown as NgForm;

        component.onCategoryChange(form);

        expect(component.isPicturePuzzle).toBeFalse();
        expect(component.isCipher).toBeFalse();

        form = {value: {category: Category.CIPHER}} as unknown as NgForm;

        component.onCategoryChange(form);

        expect(component.isPicturePuzzle).toBeFalse();
        expect(component.isCipher).toBeTrue();
    });

    it('should allow uploading an image', () => {
        const mockFile = new File(['riddle'], 'riddle.png', {type: 'image/png'});
        const mockEvent = {target: {files: [mockFile]}} as unknown as Event;

        component.onUploadImage(mockEvent);

        expect(component.image).toBeTruthy();
        expect(component.image?.name).toEqual('riddle.png');
    });

    it('should not submit the riddle if the form is invalid', () => {
        const form = {
            value: {title: '', category: Category.WORD_PUZZLE, level: Level.EASY, answer: ''},
            invalid: true
        } as unknown as NgForm;

        component.onSubmit(form);

        expect(puzzleServiceSpy.savePuzzle).not.toHaveBeenCalled();
    });

    it('should submit the riddle (not picture)', () => {
        const form = {
            value: {
                title: 'Word puzzle',
                category: Category.WORD_PUZZLE,
                level: Level.EASY,
                answer: 'Answer',
                instruction: 'instruction',
                puzzleItem: 'Puzzle item'
            },
            reset: (): void => {
                // intentionally left empty
            }
        } as unknown as NgForm;
        const resetSpy = spyOn(form, 'reset');

        component.onSubmit(form);

        expect(puzzleServiceSpy.savePuzzle).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.PUZZLES}/${testPuzzle().id}`]);
    });

    it('should submit the riddle (picture)', fakeAsync(() => {
        component.image = new File(['riddle'], 'riddle.png', {type: 'image/png'});
        const form = {
            value: {
                title: 'Word puzzle',
                category: Category.PICTURE_PUZZLE,
                level: Level.EASY,
                answer: 'Answer'
            },
            reset: (): void => {
                // intentionally left empty
            }
        } as unknown as NgForm;
        const resetSpy = spyOn(form, 'reset');

        component.onSubmit(form);

        tick(1000);

        expect(firebaseStorageSpy.ref).toHaveBeenCalled();
        expect(puzzleServiceSpy.savePuzzle).toHaveBeenCalled();
        expect(resetSpy).toHaveBeenCalled();
        expect(routerSpy.navigate).toHaveBeenCalledWith([`/${ROUTES.PUZZLES}/${testPuzzle().id}`]);
    }));

    it('should not submit a picture puzzle if no picture is uploaded', () => {
        component.image = null;
        const form = {
            value: {
                title: 'Word puzzle',
                category: Category.PICTURE_PUZZLE,
                level: Level.EASY,
                answer: 'Answer'
            }
        } as unknown as NgForm;

        component.onSubmit(form);

        expect(firebaseStorageSpy.ref).not.toHaveBeenCalled();
        expect(puzzleServiceSpy.savePuzzle).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });
});
