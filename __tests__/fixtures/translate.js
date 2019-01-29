const translate = (key, substitution = {}) => {
  if (key === "current-language-code") {
    return "en";
  }
  if (key === "other-language-code") {
    return "fr";
  }
  if (key === "other-language-in-current-language") {
    return "French";
  }
  if (key && Object.keys(substitution).length > 0) {
    return key + Object.values(substitution).join();
  }
  return key;
};

export default translate;
