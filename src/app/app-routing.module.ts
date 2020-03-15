import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './modules/welcome-module/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'error', loadChildren: () => import('./modules/error-module/error.module').then(m => m.ErrorModule)},
  {path: 'home', loadChildren: () => import('./modules/home-module/home.module').then(m => m.HomeModule)},
  {path: 'puzzles', loadChildren: () => import('./modules/puzzle-module/puzzle.module').then(m => m.PuzzleModule)},
  {path: 'profile', loadChildren: () => import('./modules/profile-module/profile.module').then(m => m.ProfileModule)},
  {path: 'admin', loadChildren: () => import('./modules/admin-module/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
