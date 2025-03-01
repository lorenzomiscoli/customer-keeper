import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslocoDirective } from "@jsverse/transloco";

export const DELETE_CUSTOMER_DIALOG_DEPS = [
  MatDialogModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  TranslocoDirective,
]
