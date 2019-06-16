import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user: User;
  form: FormGroup;
  submitType: string;
  formType: string;
  dataPostedUrl: string;
  isNewForm: Observable<boolean>;
  isLoading = false;
  streetNumber: string = '';
  route: string = '';
  city: string = '';
  state: string = '';
  zipcode: string = '';
  country: string = '';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private toastService: ToastrService,
    private userService: UserService) {
    this.isNewForm = observableOf(true);
    this.registerNewUser();
  }

  setAddressFromMap(addressObj) {
    this.zone.run(() => {
      this.streetNumber = addressObj.street_number;
      this.route = addressObj.route;
      this.city = addressObj.locality;
      this.state = addressObj.admin_area_1;
      this.zipcode = addressObj.postal_code;
      this.country = addressObj.country;
    });
  }

  private registerNewUser() {
    this.submitType = 'SAVE';
    this.formType = 'NEW REGISTRATION';
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]],
      mobile: ['', Validators.required],
      searchAddress: ['', Validators.required],
      streetNumber: [this.streetNumber],
      route: [this.route],
      city: [this.city],
      state: [this.state],
      zipcode: [this.zipcode],
      country: [this.country],
      message: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (this.form.controls[field].invalid && (this.form.controls[field].dirty || this.form.controls[field].touched));
  }

  onSubmit() {
    this.isLoading = true;
    this.form.value.streetNumber = this.streetNumber;
    this.form.value.route = this.route;
    this.form.value.city = this.city;
    this.form.value.state = this.state;
    this.form.value.zipcode = this.zipcode;
    this.form.value.country = this.country;

    this.userService.registerUser(this.form.value)
      .subscribe(response => {
        this.toastService.success('User Registered Successfully');
        this.isNewForm = observableOf(false);
        this.dataPostedUrl = response;
        this.isLoading = false;
      }, err => {
        this.toastService.error('Data Loading Error: ' + err.status + ' - ' + err.statusText);
        this.isLoading = false;
        throw err;
      });
  }
}
