import { FormControl } from '@angular/forms';

export interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

export enum LoginStatus {
  SIGNED_OUT = "signed_out",
  EXPIRED = "expired"
}
