import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RatingModule } from 'ng-starrating';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { environment } from '../environments/environment';

import { AuthInterceptorService } from './services/auth-interceptor.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { LeaderboardComponent } from './components/home/leaderboard/leaderboard.component';
import { RandomPuzzlesComponent } from './components/home/random-puzzles/random-puzzles.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { PuzzleGameComponent } from './components/puzzle-game/puzzle-game.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyDataComponent } from './components/profile/my-data/my-data.component';
import { MySolutionsComponent } from './components/profile/my-solutions/my-solutions.component';
import { MyPuzzlesComponent } from './components/profile/my-puzzles/my-puzzles.component';
import { MyCommentsComponent } from './components/profile/my-comments/my-comments.component';
import { CommentComponent } from './components/comment/comment.component';
import { AddPuzzleComponent } from './components/add-puzzle/add-puzzle.component';
import { RegLoginComponent } from './components/welcome/reg-login/reg-login.component';
import { AdminMembersComponent } from './components/admin/admin-members/admin-members.component';
import { CommentItemBaseComponent } from './components/comment/comment-item/comment-item-base.component';
import { SimpleCommentItemComponent } from './components/comment/comment-item/simple-comment-item/simple-comment-item.component';
import { ProfileCommentItemComponent } from './components/comment/comment-item/profile-comment-item/profile-comment-item.component';
import { AddCommentComponent } from './components/comment/add-comment/add-comment.component';
import { AdminPuzzlesComponent } from './components/admin/admin-puzzles/admin-puzzles.component';
import { PuzzleItemComponent } from './components/puzzles/puzzle-item/puzzle-item.component';
import { PuzzleSortComponent } from './components/puzzles/puzzle-sort/puzzle-sort.component';
import { StarsComponent } from './components/puzzles/stars/stars.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { ErrorComponent } from './components/error/error.component';
import { UpdatePuzzleComponent } from './components/update-puzzle/update-puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WelcomeComponent,
    HomeComponent,
    LeaderboardComponent,
    RandomPuzzlesComponent,
    PuzzlesComponent,
    PuzzleGameComponent,
    ProfileComponent,
    MyDataComponent,
    MySolutionsComponent,
    MyPuzzlesComponent,
    MyCommentsComponent,
    CommentComponent,
    AddPuzzleComponent,
    RegLoginComponent,
    AdminMembersComponent,
    CommentItemBaseComponent,
    SimpleCommentItemComponent,
    ProfileCommentItemComponent,
    AddCommentComponent,
    AdminPuzzlesComponent,
    PuzzleItemComponent,
    PuzzleSortComponent,
    StarsComponent,
    ErrorComponent,
    UpdatePuzzleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RatingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FontAwesomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
