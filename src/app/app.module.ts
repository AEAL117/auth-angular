import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SecuredComponent } from './secured/secured.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {KachelComponent} from "./common/kachel/kachel.component";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {MatButtonModule} from "@angular/material/button";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { UserComponent } from './user/user.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export function initKeycloak(keycloak: KeycloakService) {
const Keycloak = typeof window !== 'undefined' ? import('keycloak-js') : null;
  if (Keycloak !== null) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://localhost:9090',
          realm: 'spring-boot-realm-dev',
          clientId: 'spring-client-api-rest'
        },
        initOptions: {
          onLoad: 'check-sso',
          checkLoginIframe: false,
        },
        enableBearerInterceptor: true,
        bearerPrefix: 'Bearer',
      });
  } else {
    return () => {
      return new Promise<Boolean>((resolve, reject) => {
        resolve(true);
      });
    };
  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SecuredComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    KachelComponent,
    KeycloakAngularModule,
    MatButtonModule,
    MatIconModule,FormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
