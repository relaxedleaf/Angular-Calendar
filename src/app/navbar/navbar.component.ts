import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SignupModalComponent } from './modal/signup-modal/signup-modal.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { AuthService } from 'src/services/auth.service';

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.less"]
})
export class NavbarComponent implements OnInit {
    @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();
    public isMenuCollapsed = true;
    faBars = faBars;
    user = null;

	constructor(private modalService: NgbModal, private authService: AuthService) {}

    private _toggleSidebar() {
        this.onToggle.emit();
    }

    openSignUpForm(){
        this.modalService.open(SignupModalComponent);
    }

    openLoginForm(){
        this.modalService.open(LoginModalComponent);
    }

	ngOnInit() {
        this.authService.user.subscribe(user => {
            this.user = user;
        })
    }

    logout(){
        this._toggleSidebar();
        this.authService.logout();
    }
}
