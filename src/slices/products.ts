import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { type Filters, type Item } from "@/types";
import { getFilteredItems, sortItems } from "@/utils";

interface ProductState {
  totalList: Item[] | null;
  filteredList: Item[];
}

const initialState: ProductState = {
  totalList: null,
  filteredList: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTotalList: (state, action: PayloadAction<Item[]>) => {
      state.totalList = action.payload;
    },
    setFilteredList: (state, action: PayloadAction<Filters>) => {
      const filteredList = getFilteredItems(
        state.totalList || [],
        action.payload
      );
      state.filteredList = sortItems(filteredList, action.payload.sortBy);
    },
  },
});

export const { setTotalList, setFilteredList } = productSlice.actions;

export const selectTotalList = (state: RootState) => state.product.totalList;
export const getFilteredList = (state: RootState) => state.product.filteredList;

export default productSlice.reducer;
