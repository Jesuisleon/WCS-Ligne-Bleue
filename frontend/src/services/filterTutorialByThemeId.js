const filterTutorialByThemeId = (themeId, arrayTofilter) => {
  return arrayTofilter.filter((tutorial) => tutorial.theme_id === themeId);
};

export default filterTutorialByThemeId;
