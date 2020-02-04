import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignupModalComponent } from './modal/signup-modal/signup-modal.component';

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.less"]
})
export class NavbarComponent implements OnInit {
    @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();
    public isMenuCollapsed = true;
    faBars = faBars;

	constructor(private modalService: NgbModal) {}

    private _toggleSidebar() {
        this.onToggle.emit();
    }

    openSignUpForm(){
        this.modalService.open(SignupModalComponent);
    }

	ngOnInit() {}
}
