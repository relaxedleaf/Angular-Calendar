import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.less"]
})
export class NavbarComponent implements OnInit {
    @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();
    public isMenuCollapsed = true;
    faBars = faBars;

	constructor() {}

    private _toggleSidebar() {
        this.onToggle.emit();
    }

	ngOnInit() {}
}
