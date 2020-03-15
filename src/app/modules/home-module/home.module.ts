import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared-module/shared.module';

import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './home/leaderboard/leaderboard.component';
import { RandomPuzzlesComponent } from './home/random-puzzles/random-puzzles.component';

@NgModule({
  declarations: [
    HomeComponent,
    LeaderboardComponent,
    RandomPuzzlesComponent
  ],
  imports: [
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule {
}
