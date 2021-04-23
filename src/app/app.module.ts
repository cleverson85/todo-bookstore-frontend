import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './components/menu/menu.module';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmModalModule } from './components/confirm-modal/confirm-modal.module';

import { AppComponent } from './app.component';

import { HttpRequestInterceptor } from './shared/httprequest.interceptor';
import { AppConfig } from './app-config.model';
import { Environment } from './environment.service';

export function initializeApp(environmentConfig: Environment) {
  return (): Promise<AppConfig> => environmentConfig.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MenuModule,
    ConfirmModalModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    Environment,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Environment],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
