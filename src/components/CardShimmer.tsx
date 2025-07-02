function CardShimmer() {
  return (
    <div className="flex flex-col w-[250px] mx-auto">
      <div className="w-full h-[300px] bg-gray-300 animate-pulse rounded-sm" />
      <div className="pt-2 flex justify-between items-center">
        <div>
          <h2 className="text-sm text-white">Loading...</h2>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
        <div>
          <span className="text-lg font-medium text-white">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default CardShimmer;
