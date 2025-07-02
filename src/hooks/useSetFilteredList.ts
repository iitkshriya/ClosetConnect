import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPriceRange,
  selectPricingOption,
  selectSearch,
  selectSortBy,
} from "@/slices/filters";
import { selectTotalList, setFilteredList } from "@/slices/products";

export function useSetFilteredList() {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);
  const pricingOption = useSelector(selectPricingOption);
  const sortBy = useSelector(selectSortBy);
  const priceRange = useSelector(selectPriceRange);
  const totalList = useSelector(selectTotalList);

  useEffect(() => {
    if (totalList) {
      dispatch(setFilteredList({ search, pricingOption, sortBy, priceRange }));
    }
  }, [
    search,
    pricingOption,
    dispatch,
    totalList,
    sortBy,
    priceRange?.min,
    priceRange?.max,
    priceRange,
  ]);
}
