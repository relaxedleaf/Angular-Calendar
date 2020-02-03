import { AppRoutingModule } from "./app-routing.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FlatpickrModule } from "angularx-flatpickr";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from 'ng-sidebar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HeaderComponent } from "./calendar/header/header.component";
import { BodyComponent } from "./calendar/body/body.component";
import { CalendarService } from "src/services/calendar.service";
import { DayClickModalComponent } from "./calendar/modal/day-click-modal/day-click-modal.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		CalendarComponent,
		HeaderComponent,
		BodyComponent,
		DayClickModalComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		NgbModule,
		FlatpickrModule.forRoot(),
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
        }),
        SidebarModule.forRoot(),
        FontAwesomeModule
	],
	providers: [CalendarService],
	bootstrap: [AppComponent],
	entryComponents: [DayClickModalComponent]
})
export class AppModule {}
