import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { CalendarView } from "angular-calendar";
import { CalendarService } from "src/services/calendar.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.less"]
})
export class HeaderComponent implements OnInit {
	constructor(private calendarService: CalendarService) {}
	view: CalendarView | "month" | "week" | "day";
	viewDate: Date;
	ngOnInit() {
		this.view = this.calendarService.getView();
		this.viewDate = this.calendarService.getViewDate();
		this.calendarService.viewChanged.subscribe((view: CalendarView) => {
			this.view = view;
		});
	}

	changeView(view: CalendarView) {
		this.calendarService.setView(view);
	}

	changeViewDate(viewDate: Date) {
		this.calendarService.setViewDate(viewDate);
	}

	@Input() locale: string = "en";

	@Output() viewChange: EventEmitter<string> = new EventEmitter();

	@Output() viewDateChange: EventEmitter<Date> = new EventEmitter();
}
