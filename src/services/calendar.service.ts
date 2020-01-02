import { CalendarView } from "angular-calendar";

export class CalendarService {
	private view: CalendarView = CalendarView.Month;
	private viewDate: Date = new Date();

	getView() {
		return this.view;
	}

	setView(view: CalendarView) {
		this.view = view;
	}

	getViewDate() {
		return this.viewDate;
	}
}
