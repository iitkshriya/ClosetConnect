import {
  PRICE_MAX,
  PRICE_MIN,
  PRICING_OPTION,
  type Filters,
  type Item,
} from "@/types";

const sortingComparison = (
  a: Item,
  b: Item,
  preference: "low" | "high"
): number => {
  switch (`${a.pricingOption}, ${b.pricingOption}`) {
    case `${PRICING_OPTION.PAID}, ${PRICING_OPTION.PAID}`:
      return preference === "low" ? a.price - b.price : b.price - a.price;
    case `${PRICING_OPTION.FREE}, ${PRICING_OPTION.FREE}`:
    case `${PRICING_OPTION.VIEW_ONLY}, ${PRICING_OPTION.VIEW_ONLY}`:
      return 0;
    case `${PRICING_OPTION.PAID}, ${PRICING_OPTION.FREE}`:
      return preference === "low" ? 1 : -1;
    case `${PRICING_OPTION.FREE}, ${PRICING_OPTION.PAID}`:
      return preference === "low" ? -1 : 1;
    case `${PRICING_OPTION.PAID}, ${PRICING_OPTION.VIEW_ONLY}`:
      return preference === "low" ? -1 : 1;
    case `${PRICING_OPTION.VIEW_ONLY}, ${PRICING_OPTION.PAID}`:
      return preference === "low" ? 1 : -1;
    case `${PRICING_OPTION.FREE}, ${PRICING_OPTION.VIEW_ONLY}`:
      return preference === "low" ? -1 : 1;
    case `${PRICING_OPTION.VIEW_ONLY}, ${PRICING_OPTION.FREE}`:
      return preference === "low" ? 1 : -1;
    default:
      return 0;
  }
};

export const sortItems = (items: Item[], sortBy: string): Item[] => {
  switch (sortBy) {
    case "Item Name":
      return items.sort((a, b) => a.title.localeCompare(b.title));
    case "Price: Low to High":
      return items.sort((a, b) => sortingComparison(a, b, "low"));
    case "Price: High to Low":
      return items.sort((a, b) => sortingComparison(a, b, "high"));
    default:
      return items;
  }
};

export const getFilteredItems = (items: Item[], filters: Filters): Item[] => {
  return items.filter((item) => {
    if (filters.search) {
      const content = JSON.stringify(item).toLowerCase();
      if (!content.includes(filters.search.toLowerCase())) {
        return false;
      }
    }
    if (
      filters.pricingOption &&
      filters.pricingOption.length > 0 &&
      Object.prototype.hasOwnProperty.call(item, "pricingOption")
    ) {
      if (!filters.pricingOption.includes(item.pricingOption)) {
        return false;
      }
    }
    if (
      filters.priceRange &&
      !(
        filters.priceRange.min === PRICE_MIN &&
        filters.priceRange.max === PRICE_MAX
      )
    ) {
      if (item.pricingOption === PRICING_OPTION.PAID) {
        if (
          filters.priceRange.min >= item.price ||
          filters.priceRange.max < item.price
        ) {
          return false;
        }
      }
      if (
        filters.priceRange.max !== PRICE_MAX &&
        item.pricingOption === PRICING_OPTION.VIEW_ONLY
      ) {
        return false;
      }
      if (
        filters.priceRange.min !== PRICE_MIN &&
        item.pricingOption === PRICING_OPTION.FREE
      ) {
        return false;
      }
    }
    return true;
  });
};
