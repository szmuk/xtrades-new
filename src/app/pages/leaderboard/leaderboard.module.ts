import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeaderboardPageRoutingModule } from './leaderboard-routing.module';
import { LeaderboardPage } from './leaderboard.page';


@NgModule({
  imports: [
    SharedModule,
    LeaderboardPageRoutingModule
  ],
  declarations: [LeaderboardPage]
})
export class LeaderboardPageModule { }
