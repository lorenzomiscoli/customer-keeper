import { FormControl } from '@angular/forms';

export interface UserUpdateForm {
  username: FormControl<string>;
  name: FormControl<string | null>;
  lastname: FormControl<string | null>;
  email: FormControl<string | null>;
}

export interface UserPasswordUpdateForm {
  oldPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}
