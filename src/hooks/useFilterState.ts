import { useSelector, useDispatch } from "react-redux";
import {
  selectSearch,
  selectPricingOption,
  selectSortBy,
  setSearch,
  setPricingOption,
  setSortBy,
  setPriceRange,
  selectPriceRange,
  resetFilters,
} from "@/slices/filters";
import { useState } from "react";
import {
  PRICE_MAX,
  PRICE_MIN,
  PRICING_OPTION,
  SORT_OPTIONS,
  type PricingOption,
  type SortingOption,
} from "@/types";

export function useFilterState() {
  const dispatch = useDispatch();

  const searchFromStore = useSelector(selectSearch) || "";
  const pricingFromStore = useSelector(selectPricingOption) || [];
  const sortFromStore = useSelector(selectSortBy);
  const rangeFromStore = useSelector(selectPriceRange);

  const [searchText, setSearchText] = useState(searchFromStore);
  const [checked, setChecked] = useState<PricingOption[]>(pricingFromStore);
  const [sort, setSort] = useState<SortingOption>(sortFromStore);
  const [valueOne, setValueOne] = useState(
    rangeFromStore ? rangeFromStore.min : PRICE_MIN
  );
  const [valueTwo, setValueTwo] = useState(
    rangeFromStore ? rangeFromStore.max : PRICE_MAX
  );

  const togglePricingOption = (opt: PricingOption) => {
    const newOptions = checked.includes(opt)
      ? checked.filter((x) => x !== opt)
      : [...checked, opt];
    setChecked(newOptions);
    dispatch(setPricingOption(newOptions));
    handleSliderChange(null, newOptions);
  };

  const applySearch = () => {
    dispatch(setSearch(searchText));
  };

  const applySort = (val: SortingOption) => {
    setSort(val);
    dispatch(setSortBy(val));
  };

  const handleSliderChange = (
    ev: React.MouseEvent<HTMLInputElement> | null,
    customChecked?: PricingOption[]
  ) => {
    ev?.preventDefault();
    const isPaidChecked = (customChecked || checked).includes(
      PRICING_OPTION.PAID
    );
    if (!isPaidChecked) {
      dispatch(setPriceRange(null));
    } else {
      dispatch(setPriceRange({ min: valueOne, max: valueTwo }));
    }
  };

  const reset = () => {
    setSearchText("");
    setChecked([]);
    setSort(SORT_OPTIONS[0]);
    setValueOne(PRICE_MIN);
    setValueTwo(PRICE_MAX);
    dispatch(resetFilters());
  };

  return {
    searchText,
    setSearchText,
    checked,
    togglePricingOption,
    sort,
    applySort,
    valueOne,
    setValueOne,
    valueTwo,
    setValueTwo,
    handleSliderChange,
    applySearch,
    reset,
    isPaid: checked.includes(PRICING_OPTION.PAID),
  };
}
