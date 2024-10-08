import {inject, Injectable} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';

export interface AuthConfig {
  redirectUrlLogin: string;
  redirectUrlLogout: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  keycloak = inject(KeycloakService);

  constructor() {

      if (this.keycloak.isLoggedIn()) {


        this.keycloak.getKeycloakInstance().loadUserProfile();
      }
    
  }

  public logout(): void {
    this.keycloak.logout("http://localhost:4200/").then();
  }

  login() {
    this.keycloak.login({redirectUri: "http://localhost:4200/api/secured"}).then();
  }


  async isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  getUsername(): string {
   
    return this.keycloak.getKeycloakInstance()?.profile?.username as string;
  }

  getProfile(): string {
    return this.keycloak.getKeycloakInstance()?.profile as string;
  }

  getId(): string {
    return this.keycloak?.getKeycloakInstance()?.profile?.id as string;
  }

  getTokenExpirationDate(): number {
    return (this.keycloak.getKeycloakInstance().refreshTokenParsed as { exp: number })['exp'] as number;
  }

   getAccessToken(): string{
    return this.keycloak.getKeycloakInstance().token as string;
  }

  refresh(): Observable<any> {
    return from(this.keycloak.getKeycloakInstance().updateToken(1800));
  }

  isExpired(): boolean {
    return this.keycloak.getKeycloakInstance().isTokenExpired();
  }
}
