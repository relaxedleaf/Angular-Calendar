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
	selector: "app-signup-modal",
	templateUrl: "./signup-modal.component.html",
	styleUrls: ["./signup-modal.component.less"]
})
export class SignupModalComponent implements OnInit {
    @ViewChild('form', {static: false}) form;

	formGroup: FormGroup;
	hide: boolean = true; //used to hide or show password
	hideConfirm = true; //used to hide or show password confirmation
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
		this.formGroup = this.formBuilder.group(
			{
				first_name: [""],
				middle_name: [""],
				last_name: [""],
				email: [
					"",
					[Validators.required, Validators.email],
					this.validateEmailNotTaken.bind(this)
				],
				password: ["", [Validators.required]],
				password_confirmation: ["", [Validators.required]]
			},
			{ validator: this.passwordMatchValidator }
		);
	}

	/*
        Getters for individual form control
    */
	get first_name() {
		return this.formGroup.get("first_name");
	}
	get middle_name() {
		return this.formGroup.get("middle_name");
	}
	get last_name() {
		return this.formGroup.get("last_name");
	}
	get email() {
		return this.formGroup.get("email");
	}
	get password() {
		return this.formGroup.get("password");
	}
	get password_confirmation() {
		return this.formGroup.get("password_confirmation");
	}

	onPasswordInput() {
		if (this.formGroup.hasError("passwordMismatch"))
			this.password_confirmation.setErrors([{ passwordMismatch: true }]);
		else this.password_confirmation.setErrors(null);
	}

	getEmailErrorMessage() {
		return this.email.hasError("required")
			? "You must enter a value"
			: this.email.hasError("email")
			? "Not a valid email"
			: this.email.hasError("emailTaken")
			? "This email is already Taken"
			: "";
	}

	getPasswordErrorMessage() {
		return this.password.hasError("required")
			? "You must enter a value"
			: "";
	}

	getPasswordConfirmationErrorMessage() {
		return this.password_confirmation.hasError("required")
			? "You must enter a value"
			: this.password_confirmation.invalid &&
			  !this.password_confirmation.hasError("required")
			? "Passwords don't match"
			: "";
	}

	//custom Validators
	validateEmailNotTaken(control: AbstractControl) {
		return this.authService.checkValidEmail(control.value).pipe(
			map(res => {
				return res.response_code == STATUS_CONSTANT.ERROR_STATUS
					? { emailTaken: true }
					: null;
			})
		);
	}

	passwordMatchValidator: ValidatorFn = (
		formGroup: FormGroup
	): ValidationErrors | null => {
		if (
			formGroup.get("password").value ===
			formGroup.get("password_confirmation").value
		)
			return null;
		else return { passwordMismatch: true };
	};

	onSubmit() {
		if (this.formGroup.valid) {
			this.authService
				.signup(
					this.first_name.value,
					this.middle_name.value,
					this.last_name.value,
					this.email.value,
                    this.password.value,
                    this.password_confirmation.value
				)
				.subscribe(
					res => {
                        console.log(res);
                        if(res.response_code === STATUS_CONSTANT.SUCCESS_STATUS){
                            this.setAlert(res.message, 1);
                            this.form.resetForm();
                        }
                        else{
                            this.setAlert(res.message[(Object.keys(res.message)[0])], 0);
                        }
                    }
				);
		} else {
            this.setAlert("You are such a baaaaaaad bad boy!", 0);
		}
    }

    private setAlert(message:string, success: number){
        this.alert = {
            message,
            success
        };
    }
}
