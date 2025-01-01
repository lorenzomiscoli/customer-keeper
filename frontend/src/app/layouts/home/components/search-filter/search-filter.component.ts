import { Component } from "@angular/core";

import { SEARCH_FILTER_DEPS } from "./search-filter.dependencies";

@Component({
  selector: "app-search-filter",
  templateUrl: "./search-filter.component.html",
  styleUrl: "./search-filter.component.scss",
  imports: [SEARCH_FILTER_DEPS]
})
export class SearchFilterComponent {

}
