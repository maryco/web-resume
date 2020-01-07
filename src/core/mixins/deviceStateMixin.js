export const deviceStateMixin = {
    props: {
        /**
         * Note: These value must same at _variables.scss $breakpoints values
         * @see  src/assets/scss/_variables.scss
         */
        mobileMaxWidth: {
            type: String,
            default: '576px'
        },
        tabletMinWidth: {
            type: String,
            default: '768px'
        },
        pcMinWidth: {
            type: String,
            default: '992px'
        }
    },

    methods: {
        /**
         * Return whether current screen is mobile, depends on the media-query match result.
         * @returns {boolean}
         */
        isMobileScreen: function () {
            return window.matchMedia(`(max-width: ${this.mobileMaxWidth})`).matches;
        },

        /**
         * Whether browser supports TouchEvent.
         *
         * @returns {boolean}
         * @see https://github.com/pixijs/pixi.js/issues/4533
         * @see https://developer.mozilla.org/ja/docs/Web/API/TouchEvent
         */
        supportsTouch: function () {
            return 'ontouchstart' in window;
        },

        /**
         * Whether browser is IE!!
         * @returns {boolean}
         */
        isIE: function () {
            return /Trident/gi.test(navigator.userAgent);
        }
    }
};