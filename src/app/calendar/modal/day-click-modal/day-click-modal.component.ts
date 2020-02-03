import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarService } from 'src/services/calendar.service';
import { format } from "date-fns";
@Component({
	selector: "app-day-click-modal",
	templateUrl: "./day-click-modal.component.html",
	styleUrls: ["./day-click-modal.component.less"]
})
export class DayClickModalComponent implements OnInit {
    formattedDate: string;

	constructor(public activeModal: NgbActiveModal, private calendarService: CalendarService) {}

	ngOnInit() {
        this.formattedDate = format(this.calendarService.getDateSelected(), 'MMMM dd, yyyy');
    }
}
