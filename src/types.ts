export const API_URL = import.meta.env.VITE_API_URL;

export const PRICING_OPTION = {
  PAID: 0,
  FREE: 1,
  VIEW_ONLY: 2,
};

export const SORT_OPTIONS = [
  "Item Name",
  "Price: Low to High",
  "Price: High to Low",
];

export const PRICE_MIN = 0;

export const PRICE_MAX = 999;

export type SortingOption = (typeof SORT_OPTIONS)[number];

export type PricingOption =
  (typeof PRICING_OPTION)[keyof typeof PRICING_OPTION];

export type PriceRange = {
  min: number;
  max: number;
};

export interface Item {
  id: string;
  creator: string;
  title: string;
  pricingOption: PricingOption;
  imagePath: string;
  price: number;
}

export type Filters = {
  search?: string;
  pricingOption?: PricingOption[];
  sortBy: SortingOption;
  priceRange: PriceRange | null;
};