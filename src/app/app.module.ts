import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JWTInterceptor} from './shared/interceptors/jwt.interceptor';
import {ErrorInterceptor} from './shared/interceptors/error.interceptor';
import {JwtModule} from '@auth0/angular-jwt';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutsModule} from './shared/layouts/layouts.module';
import {RouterModule} from '@angular/router';
import {environment} from 'src/environments/environment';
import {CamelCaseInterceptor} from './shared/interceptors/camelcase.interceptor';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ColorPickerModule} from 'ngx-color-picker';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgxPrinterModule} from 'ngx-printer';
import {GlobalErrorHandler} from './shared/interceptors/global-error-handler.service';

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('515863665891-38qs6rubnt39hgbketvr1ds9eel5i8cq.apps.googleusercontent.com')
  // },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider('356066988641982')
  // }
]);

export function provideConfig() {
  return config;
}

export function tokenGetter() {
  return '';
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    LayoutsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    ColorPickerModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      closeButton: true,
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: [environment.PROTOCOL + '//' + environment.API_HOST],
        blacklistedRoutes: ['http://localhost:4200/login']
      }
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    ScrollingModule,
    AngularFontAwesomeModule,
    NgxPrinterModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CamelCaseInterceptor, multi: true},
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: ErrorHandler, useClass: GlobalErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
