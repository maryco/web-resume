import { JobResumeConfig as resumeConf } from "../../config/JobResumeChart.config";

export const localeMixin = {
    computed: {
        lang: function () {
            return navigator.language.slice(0, 2) === "ja" ? "ja" : "en";
        },

        isJa: function () {
            return this.lang === "ja";
        }
    },

    methods: {
        /**
         * Return translated string of the specified key
         * Note: If not found target in the dictionary, return key passed as a parameter
         * @param key
         * @returns {string}
         */
        localeText: function (key) {
            const dictionary = resumeConf.localization[[this.lang]];
            return (Object.keys(dictionary).some((d) => d === key)) ? dictionary[key] : key;
        }
    }
};