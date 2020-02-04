import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
	selector: "app-signup-modal",
	templateUrl: "./signup-modal.component.html",
	styleUrls: ["./signup-modal.component.less"]
})
export class SignupModalComponent implements OnInit {
    email = new FormControl("", [Validators.required, Validators.email]);
    password = new FormControl("", [Validators.required]);
    hide = true;
    hideConfirm = true;
	getEmailErrorMessage() {
		return this.email.hasError("required")
			? "You must enter a value"
			: this.email.hasError("email")
			? "Not a valid email"
			: "";
	}

    getPasswordErrorMessage(){
        return this.email.hasError("required")
                ? "You must enter a value"
                : "";
    }

	constructor(public activeModal: NgbActiveModal) {}

	ngOnInit() {}
}
