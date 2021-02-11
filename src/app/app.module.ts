import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { LoaderInterceptor } from './admin/services/loader.interceptor.service';
import { TokenInterceptor } from './admin/services/token.interceptor.service';
import { AdminServicesModule } from './admin/services/services.module';
registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,

    AppRoutingModule,
    ScullyLibModule,
    HttpClientModule,
    FormsModule,
		AdminServicesModule
  ],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
		{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
	],
  bootstrap: [AppComponent],
})
export class AppModule { }
