import { Pipe, PipeTransform } from '@angular/core';

import {
  getNumberOfDays,
  getNumberOfMonths,
  getNumberOfWeeks,
  getNumberOfYears,
} from '../utils/date.utils';

@Pipe({
  name: 'appUpdatedDateFormat',
})
export class UpdatedDateFormatPipe implements PipeTransform {
  transform(value: string) {
    let date = new Date(value);
    const days = getNumberOfDays(date);
    if (days === 0) {
      return 'Updated Today';
    } else if (days === 1) {
      return 'Updated Yesterday';
    } else {
      const weeks = getNumberOfWeeks(date);
      if (weeks === 0) {
        return 'Updated ' + days + ' days ago';
      } else if (weeks <= 4) {
        return weeks === 1
          ? 'Updated ' + weeks + ' week ago'
          : 'Updated ' + weeks + ' weeks ago';
      } else if (weeks <= 52) {
        const months = getNumberOfMonths(date);
        return months === 1
          ? 'Updated ' + months + ' month ago'
          : 'Updated ' + months + ' months ago';
      } else {
        const years = getNumberOfYears(date);
        return years === 1
          ? 'Updated ' + years + ' year ago'
          : 'Updated ' + years + ' years ago';
      }
    }
  }
}
