import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";

import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
	CalendarEvent,
	CalendarView,
	CalendarMonthViewBeforeRenderEvent
} from "angular-calendar";
import { CalendarService } from "src/services/calendar.service";
import { DayClickModalComponent } from '../modal/day-click-modal/day-click-modal.component';

@Component({
	selector: "app-body",
	templateUrl: "./body.component.html",
	styleUrls: ["./body.component.less"],
	styles: [
		`
			.bg-blue {
				background-color: hotpink !important;
			}
		`
	]
})
export class BodyComponent implements OnInit {
	view: any;
	CalendarView: any;
	viewDate: Date;

	constructor(
        private calendarService: CalendarService,
        private modalService: NgbModal
	) {}

	ngOnInit() {
		this.view = this.calendarService.getView();
		this.CalendarView = this.calendarService.getCalendarView();
		this.viewDate = this.calendarService.getViewDate();
		this.calendarService.viewChanged.subscribe((view: CalendarView) => {
			this.view = view;
		});
		this.calendarService.viewDateChanged.subscribe((viewDate: Date) => {
			this.viewDate = viewDate;
		});
	}

	@ViewChild("modalContent", { static: true }) modalContent: TemplateRef<any>;

	modalData: {
		action: string;
		event: CalendarEvent;
	};

	dayClicked($event) {
        this.calendarService.setDateSelected($event.date);
        this.modalService.open(DayClickModalComponent);
	}

	setView(view: CalendarView) {
		this.view = view;
	}

	beforeMonthViewRender(
		renderEvent: CalendarMonthViewBeforeRenderEvent
	): void {
		renderEvent.body.forEach(day => {
			if (day.isToday) {
                day.backgroundColor = 'rgba(54, 162, 235, 0.4)';
                day.cssClass
            }
		});
	}
}
