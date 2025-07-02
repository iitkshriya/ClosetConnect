import PricingOptions from "@/components/PricingOptions";
import RangeSlider from "@/components/RangeSlider";
import { useFilterState } from "@/hooks/useFilterState";
import { SORT_OPTIONS, type SortingOption } from "@/types";

export default function FiltersComponent() {
  const {
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
    isPaid,
  } = useFilterState();

  return (
    <div className="p-4">
      <div className="flex mb-6 justify-between">
        <input
          value={searchText}
          className="flex w-full bg-[#1f1f1f] border-none px-4 py-2 rounded-md text-white placeholder:text-gray-400 hover:outline-none outline-none text-[16px]"
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && applySearch()}
          placeholder="Find the items you’re looking for"
        />
        <span
          className="flex items-center cursor-pointer -ml-10 pr-5"
          onClick={applySearch}
        >
          🔍
        </span>
      </div>

      <div className="flex p-4 bg-[#1f1f1f] rounded-md mb-6 items-center justify-between gap-4 flex-wrap">
        <div className="flex w-[60%] justify-between">
          <PricingOptions selected={checked} onToggle={togglePricingOption} />
          <RangeSlider
            valueOne={valueOne}
            valueTwo={valueTwo}
            setValueOne={setValueOne}
            setValueTwo={setValueTwo}
            onChangeComplete={handleSliderChange}
            disabled={!isPaid}
          />
        </div>

        <button
          className="bg-transparent border-none cursor-pointer text-sm"
          onClick={reset}
        >
          RESET
        </button>
      </div>

      <div className="flex justify-end">
        <label className="flex items-center gap-4 text-sm text-white">
          Sort by
          <select
            value={sort}
            onChange={(e) => applySort(e.target.value as SortingOption)}
            className="bg-transparent cursor-pointer text-sm p-1 border-b-1 border-[#e0e0e0] outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
