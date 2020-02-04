import { Component, OnInit } from "@angular/core";
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	ValidatorFn,
	ValidationErrors,
	AbstractControl
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from 'src/services/auth.service';
import { map } from 'rxjs/operators';
import { STATUS_CONSTANT } from 'src/app/constants/statusConstants';

@Component({
	selector: "app-signup-modal",
	templateUrl: "./signup-modal.component.html",
	styleUrls: ["./signup-modal.component.less"]
})
export class SignupModalComponent implements OnInit {
	formGroup: FormGroup;
	hide: boolean = true; //used to hide or show password
	hideConfirm = true; //used to hide or show password confirmation

	constructor(
		public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private authService: AuthService
	) {}

	ngOnInit() {
		//create form group
		this.formGroup = this.formBuilder.group(
			{
				email: ["", [Validators.required, Validators.email], this.validateEmailNotTaken.bind(this)],
				password: ["", [Validators.required]],
				password_confirmation: ["", [Validators.required]]
			},
			{ validator: this.passwordMatchValidator }
		);
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
            : this.email.hasError('emailTaken')
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
        return this.authService.checkValidEmail(control.value).pipe(map(res => {
            return res.response_code == STATUS_CONSTANT.ERROR_STATUS? { emailTaken: true } : null;
        }));
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
}
