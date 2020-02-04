import { Component } from "@angular/core";
import { faTachometerAlt, faCalendarAlt, faRunning, faCreditCard } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.less"]
})
export class AppComponent {
    private _opened: boolean = false;
    faTachometerAlt = faTachometerAlt;
    faCalendarAlt = faCalendarAlt;
    faRunning = faRunning;
    faCreditCard = faCreditCard;

    private _toggleSidebar() {
        this._opened = !this._opened;
    }

}
