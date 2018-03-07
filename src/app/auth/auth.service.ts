import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

}
