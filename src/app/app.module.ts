import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';

import { DashboardComponent } from './dashboard.component';


import { SongService } from './song.service';

import { SongFormComponent } from './song-form.component';

import { AppRoutingModule } from './app-routing.module';
import { SpotifyService } from './spotify.service';
import { AuthService } from './auth/auth.service';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    DashboardComponent,
    SongFormComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
  ],
  providers: [
    SongService,
    SpotifyService,
    AuthService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }