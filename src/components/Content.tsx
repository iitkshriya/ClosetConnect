import type { Item } from "@/types";
import Card from "@/components/Card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import CardShimmer from "@/components/CardShimmer";
import { getFilteredList } from "@/slices/products";

function Content() {
  const { items: visibleList, loading: loadingMore } = useInfiniteScroll<Item>({
    limit: 20,
    selector: getFilteredList,
    uniqueKey: "id",
  });

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8 p-4">
      {visibleList &&
        visibleList.map((item: Item) => <Card key={item.id} item={item} />)}
      {loadingMore &&
        Array.from({ length: 20 }).map((_, index) => (
          <CardShimmer key={index} />
        ))}
    </div>
  );
}

export default Content;
