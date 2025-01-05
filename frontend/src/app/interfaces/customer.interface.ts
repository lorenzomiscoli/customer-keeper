export interface Customer {
  id: number;
  name: string;
  logoLink?: string;
}
export interface CustomerSearch {
  [key: string]: string;
}
