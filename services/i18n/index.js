import i18next from "i18next";

import * as config from "../../config/i18n";

import date from "./date";
import languageDetector from "./languageDetector";
import translationLoader from "./translationLoader";

const i18n = {
  /**
   * @returns {Promise}
   */
  init: () => {
    return new Promise((resolve, reject) => {
      i18next
        .use(languageDetector)
        .use(translationLoader)
        .init(
          {
            fallbackLng: config.fallback,
            ns: config.namespaces,
            defaultNS: config.defaultNamespace,
            interpolation: {
              escapeValue: false,
              format(value, format) {
                const d = new Date(value);
                if (d instanceof Date) {
                  return date.format(d, format);
                }
              },
            },
          },
          (error) => {
            if (error) {
              return reject(error);
            }
            date
              .init(i18next.language)
              .then(resolve)
              .catch((error) => reject(error));
          }
        );
    });
  },

  /**
   * @param {string} key
   * @param {Object} options
   * @returns {string}
   */
  t: (key, options) => i18next.t(key, options),

  /**
   * @returns {string}
   */
  get locale() {
    return i18next.language;
  },

  /**
   * Similar to React Native's Platform.select(),
   * i18n.select() takes a map with two keys, 'rtl'
   * and 'ltr'. It then returns the value referenced
   * by either of the keys, given the current
   * locale's direction.
   *
   * @param {Object<string,mixed>} map
   * @returns {mixed}
   */
  select(map) {
    return map[key];
  },
};

export const t = i18n.t;

export default i18n;
