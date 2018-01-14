import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';
import { SongFormComponent } from './song-form.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: SongDetailComponent },
    { path: 'songs', component: SongsComponent },
    { path: 'create', component: SongFormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }