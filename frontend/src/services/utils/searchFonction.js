const SearchTutorial = (searchPhrases, tuto) => {
  const search = searchPhrases;
  const searchToString = search.split(" ");
  const searchValueRegexTrad = [];

  function ToLettersOnLowerCase(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/[0-9]/g, "")
      .toLowerCase();
  }

  searchToString.forEach(function f(element) {
    const searchTradToRegex = ToLettersOnLowerCase(element);
    searchValueRegexTrad.push(searchTradToRegex);
  });

  const tutorialsToFind = tuto.map((tutorial) => {
    return {
      ...tutorial,
      hashtag: tutorial.hashtag.map((hashtag) => hashtag.text),
    };
  });
  const match1 = [];

  searchValueRegexTrad.forEach(function f(element) {
    const matchElement = tutorialsToFind.filter((e) =>
      e.hashtag.includes(element)
    );
    if (matchElement[0]) {
      match1.push(matchElement.slice());
      matchElement.splice(0);
    }
  });
  const match2 = match1.flat();
  match2.forEach(function f() {});
  const duplicateIds = match2.reduce((acc, curr) => {
    if (acc.hasOwnProperty(curr.id)) {
      acc[curr.id].count += 1;
    } else {
      acc[curr.id] = { ...curr, count: 1 };
    }
    return acc;
  }, {});
  const sortedMatches = Object.values(duplicateIds).sort(
    (a, b) => b.count - a.count
  );
  return sortedMatches;
};

export default SearchTutorial;
