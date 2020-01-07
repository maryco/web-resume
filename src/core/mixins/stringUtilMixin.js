export const stringUtilMixin = {
    computed: {
        randomStringSeed: () => {
            return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        }
    },

    methods: {
        /**
         * Generate specific length random strings from the seeds.
         * @param length
         * @returns {string}
         */
        generateRandomString(length = 0) {
            const chars = this.randomStringSeed.split("");
            const result = [];

            Array(length).fill(0).forEach((d) => {
                const i = parseInt(Math.random() * chars.length);
                result.push(chars[i]);
            });
            return result.join("");
        },

        /**
         * Note: It's forgive "0000-00-00" :-)
         * @param {string} dateString
         * @returns {boolean}
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
         * (See the "Note" near the description of "dateString")
         */
        isProbablyDateFormat(dateString) {
            return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateString);
        },

        camelToKebab(camelString) {
          return camelString.replace(/([A-Z]+)/g, '-$1').toLowerCase();
        },
    }
}