import { FormControl } from '@angular/forms';

export interface CustomerAddForm {
  name: FormControl<string>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}
