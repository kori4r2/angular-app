import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventComponent } from './event/event.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    EventDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
		BrowserAnimationsModule,
    OwlDateTimeModule, 
		OwlNativeDateTimeModule,
    AppRoutingModule,
		FormsModule
  ],
  providers: [
		{provide: OWL_DATE_TIME_LOCALE, useValue: "pt-br"}
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
