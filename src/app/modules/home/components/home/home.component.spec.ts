import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

@Component({
    selector: 'app-navbar',
    template: ''
})
class MockNavbarComponent {
}

@Component({
    selector: 'app-random-puzzles',
    template: ''
})
class MockRandomPuzzlesComponent {
}

@Component({
    selector: 'app-leaderboard',
    template: ''
})
class MockLeaderboardComponent {
}

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                MockNavbarComponent,
                MockRandomPuzzlesComponent,
                MockLeaderboardComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
