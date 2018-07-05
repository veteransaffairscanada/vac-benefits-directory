exports.redux2i18n = undefined;

// eslint-disable-next-line
var redux2i18n = (exports.redux2i18n = function redux2i18n(i18n, translations) {
  let i18nEn = {};
  let i18nFr = {};
  translations.forEach(translation => {
    if (translation.section) {
      if (!i18nEn[translation.section]) {
        i18nEn[translation.section] = {};
        i18nFr[translation.section] = {};
      }
      i18nEn[translation.section][translation.key] = translation.English;
      i18nFr[translation.section][translation.key] = translation.French;
    } else {
      i18nEn[translation.key] = translation.English;
      i18nFr[translation.key] = translation.French;
    }
  });
  i18n.addResourceBundle("en", "common", i18nEn);
  i18n.addResourceBundle("fr", "common", i18nFr);
});
