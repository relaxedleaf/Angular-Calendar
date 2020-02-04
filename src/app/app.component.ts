import { Component, OnInit } from "@angular/core";
import { faTachometerAlt, faCalendarAlt, faRunning, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/services/auth.service';

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit{
    private _opened;
    faTachometerAlt = faTachometerAlt;
    faCalendarAlt = faCalendarAlt;
    faRunning = faRunning;
    faCreditCard = faCreditCard;
    user;

    constructor(private authService: AuthService){}

    private _toggleSidebar() {
        this._opened = !this._opened;
    }

    ngOnInit(){
        this.authService.autoLogin();
        this.authService.user.subscribe(user => {
            this.user = user;
            user? this._opened = true : false;
        })
    }

}
