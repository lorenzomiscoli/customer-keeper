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
  transform(
    value: string,
    translations = {
      today: 'today',
      yesterday: 'yesterday',
      dayAgo: 'day ago',
      daysAgo: 'days ago',
      weekAgo: 'week ago',
      weeksAgo: 'weeks ago',
      monthAgo: 'month ago',
      monthsAgo: 'months ago',
      yearAgo: 'year ago',
      yearsAgo: 'years ago',
    }
  ) {
    let date = new Date(value);
    const days = getNumberOfDays(date);
    if (days === 0) {
      return translations.today;
    } else if (days === 1) {
      return translations.yesterday;
    } else {
      const weeks = getNumberOfWeeks(date);
      if (weeks === 0) {
        return days + ' ' + translations.daysAgo;
      } else if (weeks <= 4) {
        return weeks === 1
          ? weeks + ' ' + translations.weekAgo
          : weeks + ' ' + translations.weeksAgo;
      } else if (weeks <= 52) {
        const months = getNumberOfMonths(date);
        return months === 1
          ? months + ' ' + translations.monthAgo
          : months + ' ' + translations.monthsAgo;
      } else {
        const years = getNumberOfYears(date);
        return years === 1
          ? years + ' ' + translations.yearAgo
          : years + ' ' + translations.yearsAgo;
      }
    }
  }
}
