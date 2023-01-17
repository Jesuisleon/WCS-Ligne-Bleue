const SearchTutorial = (searchPhrases, tutorialsToFind) => {
  const search = searchPhrases;
  const searchToString = search.split(" ");
  const match1 = [];

  searchToString.forEach(function (element, index) {
    let i = 0;
    const matchElement = tutorialsToFind.filter((e) =>
      e.hashtag.includes(element)
    );
    console.log(matchElement);
    matchElement;

    if (matchElement[0]) {
      match1.push(matchElement.slice());
      matchElement.splice(0);
    }
  });

  const match2 = match1.flat();

  match2.forEach(function (element, index) {});
  const duplicateIds = match2.reduce((acc, curr) => {
    if (acc.hasOwnProperty(curr.id)) {
      acc[curr.id].count++;
    } else {
      acc[curr.id] = { ...curr, count: 1 };
    }
    return acc;
  }, {});
  const sortedMatches = Object.values(duplicateIds).sort(
    (a, b) => b.count - a.count
  );
  sortedMatches;

  return sortedMatches;
};

export default SearchTutorial;
