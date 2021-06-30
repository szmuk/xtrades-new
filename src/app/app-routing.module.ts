import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './shared/guards/authentication/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'alerts',
    pathMatch: 'full'
  },
  {
    path: 'signin-discord',
    redirectTo: 'alerts',
    pathMatch: 'full'
  },
  {
    path: 'alerts',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/alerts/alerts.module').then(m => m.AlertsPageModule)
  },
  {
    path: 'leaderboard',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./pages/leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
  },
  {
    path: 'xhub',
    loadChildren: () => import('./pages/xhub/xhub.module').then(m => m.XhubPageModule)
  },
  {
    path: '**',
    redirectTo: 'alerts'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
