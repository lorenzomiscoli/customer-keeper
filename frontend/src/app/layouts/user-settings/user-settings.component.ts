import { Component } from '@angular/core';
import { USER_SETTINGS_DEPS } from './user-settings.dependencies';

@Component({
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss',
  imports: [USER_SETTINGS_DEPS],
})
export default class UserSettingsComponent {
  public selectedTab: number = 0;

}
