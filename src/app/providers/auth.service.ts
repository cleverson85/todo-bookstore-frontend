import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'src/app/models/usuario';
import { Environment } from '../environment.service';
import { ApiRoute } from '../shared/enum/apiRoutes.enum';
import { Token } from './../shared/token.enum';
import { ToasterService } from './common/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  mostrarMenuEmitter = new EventEmitter<boolean>();

  private readonly API = Environment.settings.api.url;

  tokenHelper = new JwtHelperService();
  tempUser = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toaster: ToasterService
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    }),
  };

  login(usuario: Usuario) {
    this.httpClient.post(`${this.API}${ApiRoute.LOGIN}`, usuario).subscribe(
      (result: any) => {
        this.configureSession(result);
      },
      (e: HttpErrorResponse) => {
        const { error } = e;
        this.toaster.showToastError('Email ou senha incorretos.');
      }
    );
  }

  logOut() {
    this.removeToken();
    this.mostrarMenuEmitter.emit(false);
    this.router.navigate(['']);
  }

  removeToken() {
    localStorage.removeItem(Token.Key);
  }

  setToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getToken(key: string): string {
    return localStorage.getItem(key);
  }

  configureSession(result: any) {
    const { token, isAuthenticaded } = result;

    if (isAuthenticaded) {
      this.setToken(Token.Key, token);
      this.router.navigate(['/home']);
    } else {
      this.logOut();
    }
  }

  tokenIsExpired(): boolean {
    const isExpired = this.tokenHelper.isTokenExpired(this.getToken(Token.Key));
    this.mostrarMenuEmitter.emit(!isExpired);

    if (isExpired) {
      this.logOut();
    }

    return isExpired;
  }
}
