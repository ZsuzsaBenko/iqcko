import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ROUTES } from './models/constants';
import { WelcomeComponent } from './modules/welcome/components/welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: `${ROUTES.ERROR}`,
        loadChildren: async () => import('./modules/error/error.module').then(m => m.ErrorModule)
    },
    {
        path: `${ROUTES.HOME}`,
        loadChildren: async () => import('./modules/home/home.module').then(m => m.HomeModule)
    },
    {
        path: `${ROUTES.PUZZLES}`,
        loadChildren: async () => import('./modules/puzzle/puzzle.module').then(m => m.PuzzleModule)
    },
    {
        path: `${ROUTES.PROFILE}`,
        loadChildren: async () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: `${ROUTES.ADMIN}`,
        loadChildren: async () => import('./modules/admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: '**',
        redirectTo: `${ROUTES.HOME}`
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
