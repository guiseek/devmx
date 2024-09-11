import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignIn } from '@devmx/shared-api-interfaces';
import { TypedForm } from '../types';

export class SignInForm extends FormGroup<TypedForm<SignIn>> {
  constructor() {
    super({
      username: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
    });
  }
}
