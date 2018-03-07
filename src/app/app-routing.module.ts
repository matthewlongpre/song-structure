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
    { path: 'detail/:id', component: SongDetailComponent, canActivate: [AuthGuard] },
    { path: 'songs', component: SongsComponent },
    { path: 'create', component: SongFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule { }