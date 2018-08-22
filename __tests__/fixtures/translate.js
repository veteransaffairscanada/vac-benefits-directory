const translate = key => {
  if (key === "current-language-code") {
    return "en";
  }
  if (key === "other-language-code") {
    return "fr";
  }
  if (key === "other-language-in-current-language") {
    return "French";
  }
  return key;
};

export default translate;
