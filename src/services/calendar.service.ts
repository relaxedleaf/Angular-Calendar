import { CalendarView } from "angular-calendar";
import { EventEmitter } from "@angular/core";

export class CalendarService {
	private view: CalendarView = CalendarView.Month;
	private viewDate: Date = new Date();
	private CalendarView = CalendarView;

	viewChanged = new EventEmitter<CalendarView>();
	viewDateChanged = new EventEmitter<Date>();

	getView() {
		return this.view;
	}

	getViewDate() {
		return this.viewDate;
	}

	getCalendarView() {
		return this.CalendarView;
	}

	setView(view: CalendarView) {
		this.view = view;
		this.viewChanged.emit(view);
	}

	setViewDate(viewDate: Date) {
		this.viewDate = viewDate;
		this.viewDateChanged.emit(viewDate);
	}
}
