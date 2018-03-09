import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})

export class AppComponent {
    constructor(
        public router: Router,
        private authService: AuthService
    ){}
    title = 'Song Stucture';
    ngOnInit() {
        console.log(localStorage);
        console.log(this.authService.access_token);
        console.log(this.authService.storedState);
    }
    login(): void {
        this.authService._login();
    }
}