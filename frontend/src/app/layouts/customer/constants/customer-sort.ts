export enum CustomerSort {
  NAME = 'NAME',
  UPDATED_DATE = 'UPDATED_DATE',
}

// Record type annotation guaranties that all the values from the enum are presented in the mapping
export const CustomerSortLabelMapping: Record<CustomerSort, string> = {
  [CustomerSort.NAME]: 'Name',
  [CustomerSort.UPDATED_DATE]: 'Updated date',
};
