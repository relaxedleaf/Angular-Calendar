import { CalendarView } from "angular-calendar";
import { EventEmitter } from "@angular/core";

export class CalendarService {
	private view: CalendarView = CalendarView.Month;
	private viewDate: Date = new Date();
    private CalendarView = CalendarView;

    private dateSelected: Date = new Date();

	viewChanged = new EventEmitter<CalendarView>();
	viewDateChanged = new EventEmitter<Date>();

	getView() {
		return this.view;
    }
	setView(view: CalendarView) {
		this.view = view;
		this.viewChanged.emit(view);
	}


	getViewDate() {
		return this.viewDate;
    }
	setViewDate(viewDate: Date) {
		this.viewDate = viewDate;
		this.viewDateChanged.emit(viewDate);
	}

	getCalendarView() {
		return this.CalendarView;
    }

    getDateSelected(){
        return this.dateSelected;
    }
    setDateSelected(date: Date){
        this.dateSelected = date;
    }
}
