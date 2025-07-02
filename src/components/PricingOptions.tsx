import { PRICING_OPTION, type PricingOption } from "@/types";

type Props = {
  selected: PricingOption[];
  onToggle: (opt: PricingOption) => void;
};

export default function PricingOptions({ selected, onToggle }: Props) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-light text-xs mr-2">Pricing Option</span>
      {Object.entries(PRICING_OPTION).map(([key, value]) => (
        <label key={value} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected.includes(value)}
            onChange={() => onToggle(value)}
          />
          {key
            .split("_")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(" ")}
        </label>
      ))}
    </div>
  );
}
