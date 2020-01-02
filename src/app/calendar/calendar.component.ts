import { Component, OnInit } from "@angular/core";
import { CalendarService } from "src/services/calendar.service";

@Component({
	selector: "app-calendar",
	templateUrl: "./calendar.component.html",
	styleUrls: ["./calendar.component.less"],
	providers: [CalendarService]
})
export class CalendarComponent implements OnInit {
	constructor(private calendarService: CalendarService) {}

	ngOnInit() {}
}
