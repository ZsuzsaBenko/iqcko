import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { testPuzzle } from '../../../../test/test-util.spec';
import { StarsComponent } from './stars.component';

describe('StarsComponent', () => {
    let component: StarsComponent;
    let fixture: ComponentFixture<StarsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [StarsComponent],
            imports: [FontAwesomeModule]
        }).compileComponents();

        fixture = TestBed.createComponent(StarsComponent);
        component = fixture.componentInstance;
        component.puzzle = testPuzzle();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
