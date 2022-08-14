import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { SolutionService } from '../../../../services/solution.service';
import { testMember, testSolution, testSolutions } from '../../../../test/test-util.spec';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { MemberSolutionsComponent } from './member-solutions.component';
import SpyObj = jasmine.SpyObj;

describe('MemberSolutionsComponent', () => {
    let solutionService: SpyObj<SolutionService>;
    let modalServiceSpy: SpyObj<NgbModal>;
    let component: MemberSolutionsComponent;
    let fixture: ComponentFixture<MemberSolutionsComponent>;

    beforeEach(async () => {
        solutionService = jasmine.createSpyObj('SolutionService',
            ['getAllSolutionsByMember', 'getAllSolutionsByLoggedInMember', 'deleteSolution']);
        solutionService.getAllSolutionsByMember.and.returnValue(of(testSolutions()));
        solutionService.getAllSolutionsByLoggedInMember.and.returnValue(of(testSolutions()));
        solutionService.deleteSolution.and.returnValue(of(null));
        modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

        await TestBed.configureTestingModule({
            declarations: [MemberSolutionsComponent],
            providers: [
                {provide: SolutionService, useValue: solutionService},
                {provide: NgbModal, useValue: modalServiceSpy}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(MemberSolutionsComponent);
        component = fixture.componentInstance;
        component.member = testMember();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should count solution speed', () => {
        expect(component.countSpeed(57)).toEqual('57 másodperc');
        expect(component.countSpeed(135)).toEqual('2 perc 15 másodperc');
    });

    it('should toggle the solutions\' visibility', () => {
        component.toggleVisible();
        expect(component.isVisible).toBeTrue();

        component.toggleVisible();
        expect(component.isVisible).toBeFalse();
    });

    it('should get all solutions by member when toggled visible and not yet loaded', () => {
        component.isAdminPage = true;

        component.toggleVisible();

        expect(solutionService.getAllSolutionsByMember).toHaveBeenCalledWith(testMember().id);
        expect(component.solutionsLoaded).toBeTrue();
    });

    it('should get all solutions by logged-in member when toggled visible and not yet loaded', () => {
        component.isAdminPage = false;

        component.toggleVisible();

        expect(solutionService.getAllSolutionsByLoggedInMember).toHaveBeenCalled();
        expect(component.solutionsLoaded).toBeTrue();
    });

    it('should not send request for solutions more than once', () => {
        component.isAdminPage = false;

        component.toggleVisible();
        component.toggleVisible();
        component.toggleVisible();

        expect(solutionService.getAllSolutionsByLoggedInMember).toHaveBeenCalledTimes(1);
    });

    it('should delete a solution if confirmed', () => {
        component.isAdminPage = true;
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(true)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteSolution(testSolution().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(solutionService.deleteSolution).toHaveBeenCalledWith(testSolution().id);
        expect(component.solutions.find(solution => solution.id === testSolution().id)).toBeFalsy();
    });

    it('should not delete a solution if not confirmed', () => {
        component.isAdminPage = true;
        const mockModalRef = {
            componentInstance: ConfirmModalComponent,
            close: (): void => {
                // intentionally left empty
            },
            closed: of(false)
        } as unknown as NgbModalRef;
        modalServiceSpy.open.and.returnValue(mockModalRef);

        component.deleteSolution(testSolution().id);

        expect(modalServiceSpy.open).toHaveBeenCalled();
        expect(solutionService.deleteSolution).not.toHaveBeenCalled();
    });

});
