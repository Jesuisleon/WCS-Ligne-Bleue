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

export const adminLookingOtherProfile = (isAdmin, userContextId, userId) => {
  if (isAdmin) {
    if (userContextId !== userId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
