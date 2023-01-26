export const FilterByOptionsSelected = (ArrayToFilter, filterOption) => {
  if (filterOption === "Tout") {
    return ArrayToFilter;
  }
  if (filterOption === "Validé") {
    return ArrayToFilter.filter((e) => e.user_id !== null);
  }
  if (filterOption === "A découvrir") {
    return ArrayToFilter.filter((e) => e.user_id === null);
  }
};
