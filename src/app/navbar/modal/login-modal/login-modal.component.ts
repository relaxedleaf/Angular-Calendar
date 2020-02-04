import { Component, OnInit, ViewChild } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	ValidatorFn,
	ValidationErrors,
	AbstractControl,
	NgForm
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "src/services/auth.service";
import { map } from "rxjs/operators";
import { STATUS_CONSTANT } from "src/app/constants/statusConstants";

@Component({
	selector: "app-login-modal",
	templateUrl: "./login-modal.component.html",
	styleUrls: ["./login-modal.component.less"]
})
export class LoginModalComponent implements OnInit {
	@ViewChild("form", { static: false }) form;

	formGroup: FormGroup;
	hide: boolean = true; //used to hide or show password
	alert = {
		message: "",
		success: -1
	};
	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {}

	ngOnInit() {
		//create form group
		this.formGroup = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]]
		});
	}

	/*
        Getters for individual form control
    */
	get email() {
		return this.formGroup.get("email");
	}
	get password() {
		return this.formGroup.get("password");
	}
	getEmailErrorMessage() {
		return this.email.hasError("required")
			? "You must enter a value"
			: this.email.hasError("email")
			? "Not a valid email"
			: "";
	}

	getPasswordErrorMessage() {
		return this.password.hasError("required")
			? "You must enter a value"
			: "";
	}

	onSubmit() {
		if (this.formGroup.valid) {
			this.authService
				.login(this.email.value, this.password.value)
				.subscribe(res => {
					if (res.response_code === STATUS_CONSTANT.SUCCESS_STATUS) {
						this.setAlert(res.message, 1);
						this.form.resetForm();
						setTimeout(() => {
							this.activeModal.close();
                        }, 2000);
                        this.authService.handleAuthentication(res.user.first_name, res.user.middle_name, res.user.last_name, res.user.email, res.token, res.expires_in);
					} else {
						if (res.message) {
							this.setAlert(res.message, 0);
						} else {
							this.setAlert(
								res.message[Object.keys(res.message)[0]],
								0
							);
						}
					}
				});
		} else {
			this.setAlert("You are such a baaaaaaad bad boy!", 0);
		}
	}

	private setAlert(message: string, success: number) {
		this.alert = {
			message,
			success
		};
	}
}
