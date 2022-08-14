import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { RandomPuzzlesComponent } from './components/random-puzzles/random-puzzles.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
    declarations: [
        HomeComponent,
        LeaderBoardComponent,
        RandomPuzzlesComponent
    ],
    imports: [
        HomeRoutingModule,
        SharedModule
    ]
})
export class HomeModule {
}
