import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs.component';
import { SongDetailComponent } from './song-detail.component';
import { DashboardComponent } from './dashboard.component';

import { SongService } from './song.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [SongService],
  bootstrap: [AppComponent]
})

export class AppModule { }