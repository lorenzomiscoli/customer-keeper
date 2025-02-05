import { Component, input, output } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [MatButtonModule, MatIconModule],
})
export class PaginationComponent {
  public currentPage = 0;
  public totalPages = input.required<number>();
  public pageChanged = output<number>();

  public changePage(page: number): void {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }
}
