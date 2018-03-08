import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard.component';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';
import { SongFormComponent } from './song-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/songs', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: SongDetailComponent },
    { path: 'songs', component: SongsComponent, canActivate: [AuthGuard] },
    { path: 'create', component: SongFormComponent},
    { path: 'callback', component: SongsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule { }
