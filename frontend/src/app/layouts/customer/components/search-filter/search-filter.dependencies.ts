import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export const SEARCH_FILTER_DEPS = [
  FormsModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  RouterLink
];
