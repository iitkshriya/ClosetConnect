import { PRICING_OPTION, type Item, type PricingOption } from "@/types";

function Card({ item }: { item: Item }) {
  const formatPrice = (price: number): string => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const showPricingOption = (option: PricingOption, price: number): string => {
    switch (option) {
      case PRICING_OPTION.PAID:
        return formatPrice(price);
      case PRICING_OPTION.FREE:
        return "FREE";
      case PRICING_OPTION.VIEW_ONLY:
        return "View Only";
      default:
        return formatPrice(price);
    }
  };

  return (
    <div className="flex flex-col w-[250px] mx-auto">
      <img
        src={item.imagePath}
        alt={item.title}
        className="w-full h-[300px] object-cover rounded-sm"
      />
      <div className="pt-2 flex justify-between items-center">
        <div>
          <h2 className="text-sm text-white">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.creator}</p>
        </div>
        <div>
          <span className="text-lg font-medium text-white">
            {showPricingOption(item.pricingOption, item.price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
