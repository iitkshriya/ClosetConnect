import { Suspense } from "react";
import { API_URL, type Item } from "@/types";
import Content from "@/components/Content";
import CardShimmer from "@/components/CardShimmer";
import { useCachedFetch } from "@/hooks/useCachedFetch";
import { useSetFilteredList } from "@/hooks/useSetFilteredList";
import { selectTotalList } from "@/slices/products";
import FiltersComponent from "@/components/FiltersComponent";

function ContentsPage() {
  const { data, loading, error } = useCachedFetch<Item[] | null>({
    baseUrl: `${API_URL}/api/data`,
    method: "GET",
    action: "product/setTotalList",
    selector: selectTotalList,
  });

  useSetFilteredList();

  return (
    <div id="main" className="flex flex-col mb-8 mt-17">
      <FiltersComponent />
      <Suspense
        fallback={Array.from({ length: 20 }).map((_, index) => (
          <CardShimmer key={index} />
        ))}
      >
        {error && !loading && <p>Error: {error}</p>}
        {data && !loading && <Content />}
      </Suspense>
    </div>
  );
}
export default ContentsPage;
