import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import {
  SORT_OPTIONS,
  type PriceRange,
  type PricingOption,
  type SortingOption,
} from "@/types";

interface FiltersState {
  pricingOption: PricingOption[];
  search: string;
  sortBy: SortingOption;
  priceRange: PriceRange | null;
}

const initialState: FiltersState = {
  pricingOption: [],
  search: "",
  sortBy: SORT_OPTIONS[0],
  priceRange: null,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setPricingOption: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOption = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortingOption>) => {
      state.sortBy = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<PriceRange | null>) => {
      state.priceRange = action.payload;
    },
    resetFilters: (state) => {
      state.pricingOption = [...initialState.pricingOption];
      state.search = initialState.search;
      state.sortBy = initialState.sortBy;
      state.priceRange = initialState.priceRange;
    },
  },
});

export const {
  setPricingOption,
  setSearch,
  setSortBy,
  setPriceRange,
  resetFilters,
} = filtersSlice.actions;

export const selectPricingOption = (state: RootState) =>
  state.filters.pricingOption;
export const selectSearch = (state: RootState) => state.filters.search;
export const selectSortBy = (state: RootState) => state.filters.sortBy;
export const selectPriceRange = (state: RootState) => state.filters.priceRange;

export default filtersSlice.reducer;
