import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoDirective } from '@jsverse/transloco';

import { ProfileInfoComponent } from './components/profilo-info/profile-info.component';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';

export const USER_SETTINGS_DEPS = [
  RouterLink,
  MatTabsModule,
  MatIconModule,
  MatListModule,
  ProfileInfoComponent,
  SecuritySettingsComponent,
  TranslocoDirective,
];
