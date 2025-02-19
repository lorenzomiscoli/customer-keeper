import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoDirective } from '@jsverse/transloco';

export const LOGIN_DEPS = [
 ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, TranslocoDirective
]
