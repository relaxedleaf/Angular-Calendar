import { AppRoutingModule } from "./app-routing.module";

import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatFormFieldModule,
	MatInputModule,
	MatRadioModule,
	MatSelectModule,
	MatSliderModule,
	MatSlideToggleModule,
    MatIconModule
} from "@angular/material";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { FlatpickrModule } from "angularx-flatpickr";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SidebarModule } from "ng-sidebar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { HeaderComponent } from "./calendar/header/header.component";
import { BodyComponent } from "./calendar/body/body.component";
import { CalendarService } from "src/services/calendar.service";
import { DayClickModalComponent } from "./calendar/modal/day-click-modal/day-click-modal.component";
import { SignupModalComponent } from "./navbar/modal/signup-modal/signup-modal.component";
import { AuthService } from 'src/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginModalComponent } from './navbar/modal/login-modal/login-modal.component';

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		CalendarComponent,
		HeaderComponent,
		BodyComponent,
		DayClickModalComponent,
		SignupModalComponent,
		LoginModalComponent
	],
	imports: [
        CommonModule,
        HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
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
		FontAwesomeModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatSliderModule,
        MatSlideToggleModule,
        MatIconModule,
	],
	providers: [CalendarService, AuthService],
	bootstrap: [AppComponent],
	entryComponents: [DayClickModalComponent, SignupModalComponent, LoginModalComponent]
})
export class AppModule {}
