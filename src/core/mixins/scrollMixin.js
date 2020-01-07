import TWEEN from "@tweenjs/tween.js";

export const scrollMixin = {
    name: 'scrollMixin',

    data: function () {
        return {
            scrollWindowTween: undefined,
        };
    },

    watch: {
        scrollWindowTween: function (newVal) {
            if (newVal !== undefined) {
                this.animateWindow();
            }
        }
    },

    methods: {
        /**
         * Execute window scroll tween.
         * @param {number} toY
         */
        scrollWindow: function (toY) {
            if (this.scrollTween !== undefined) {
                // FIXME: Is need to stop/remove of the current Tween instance?
                // this.scrollTween.stop();
                // TWEEN.remove(this.scrollTween);
            }

            // Note: IE does not support 'window.scrollY'
            // @see https://developer.mozilla.org/ja/docs/Web/API/Window/scrollY
            this.scrollWindowTween = new TWEEN.Tween({ posY: window.pageYOffset })
                .to({ posY: toY })
                .delay(100)
                .easing(TWEEN.Easing.Cubic.Out)
                .onUpdate((d) => {
                    window.scrollTo(0, parseInt(d.posY));
                })
                .start();
        },

        /**
         *
         * @param {HTMLElement} targetElm
         * @param step
         * @returns {null|_Group.Tween}
         */
        generateScrollElmTween: function (targetElm, step = 1) {
            if (targetElm.scrollTop === undefined) {
                return null;
            }
            return new TWEEN.Tween({ posY: targetElm.scrollTop })
                .to({ posY: (step >= 0) ? targetElm.clientHeight : 0 })
                .delay(100)
                .onUpdate(() => {
                    targetElm.scrollTop = targetElm.scrollTop + step
                })
        },

        /**
         * Animate for window
         * @see https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame
         */
        animateWindow: function () {
            let reqId = requestAnimationFrame(this.animateWindow);
            if (!TWEEN.update()) {
                cancelAnimationFrame(reqId)
            }
        },
    }
};