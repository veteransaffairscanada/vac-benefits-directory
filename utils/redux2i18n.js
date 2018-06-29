exports.redux2i18n = undefined;

var redux2i18n = (exports.redux2i18n = function redux2i18n(i18n, translations) {
  // export const redux2i18n = (i18n, translations) => {
  let i18nEn = {};
  let i18nFr = {};
  translations.forEach(text => {
    if (text.section) {
      if (!i18nEn[text.section]) {
        i18nEn[text.section] = {};
        i18nFr[text.section] = {};
      }
      i18nEn[text.section][text.key] = text.English;
      i18nFr[text.section][text.key] = text.French;
    } else {
      i18nEn[text.key] = text.English;
      i18nFr[text.key] = text.French;
    }
  });
  i18n.addResourceBundle("en", "common", i18nEn);
  i18n.addResourceBundle("fr", "common", i18nFr);
});
