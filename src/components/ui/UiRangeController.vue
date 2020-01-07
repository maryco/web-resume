<template>
    <div class="range-control">
        <div class="range-control-base">
            <svg :viewBox="responsiveViewPort" width="100%" height="100%"
                 id="range-control-svg"
                 v-on="changeRangeHandler">
                <filter id="range-control-knob__shadow" width="160%" height="160%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                    <feOffset dx="2" dy="2"></feOffset>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
                <filter id="range-control-gauge__glow">
                    <feFlood flood-color="#cccccc"/>
                    <feComposite in2="SourceAlpha" operator="out"/>
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feComposite operator="atop" in2="SourceGraphic"/>
                </filter>
                <rect x="0" y="31" width="100%" height="18" rx="9"
                      class="range-control-gauge-base"
                      filter="url(#range-control-gauge__glow)"></rect>
                <rect :x="activeGaugeScope.x" y="31" :width="activeGaugeScope.width" height="18"
                      class="range-control-gauge"
                      filter="url(#range-control-gauge__glow)"></rect>
                <g :class="{ 'range-control-knob__active': isActiveL }">
                    <text :x="rangeLabelPositionL" y="16"
                          class="range-control-label"
                          @click.prevent.stop>
                        {{ rangeFrom }}
                        <template v-if="isTooClosePosition">-{{ rangeTo }}</template>
                    </text>
                    <circle :cx="rangeKnobPositionL" cy="40"
                            :r="gaugeKnobRadius" class="range-control-knob"
                            filter="url(#range-control-knob__shadow)"
                            v-on="supportsTouch()
                        ? { touchstart: ($event) => activateControl($event, true) }
                        : { mousedown: ($event) => activateControl($event, true)}">
                    </circle>
                </g>
                <g :class="{
                    'range-control-knob__conceal': rangeFrom === rangeTo,
                    'range-control-knob__active': isActiveR }">
                    <text v-if="!isTooClosePosition"
                          :x="rangeLabelPositionR" y="16"
                          class="range-control-label"
                          @click.prevent.stop>
                        {{ rangeTo }}
                    </text>
                    <circle :cx="rangePositionR - gaugeKnobRadius" cy="40"
                            :r="gaugeKnobRadius"
                            class="range-control-knob"
                            filter="url(#range-control-knob__shadow)"
                            v-on="supportsTouch()
                        ? { touchstart: ($event) => activateControl($event) }
                        : { mousedown: ($event) => activateControl($event)}">
                    </circle>
                </g>
            </svg>
        </div>
    </div>
</template>

<script>
    import {throttle} from "lodash";
    import TWEEN from "@tweenjs/tween.js";

    export default {
        name: "UiRangeController",

        data: function () {
            return {
                /**
                 *  Range variables.
                 */
                rangeFrom: this.min,
                rangeTo: this.max,

                /**
                 *  Range controllers state.
                 */
                isActiveL: false,
                isActiveR: false,
                rangePositionL: this.sizeProps.pc.gaugeCapWidth,
                rangePositionR: this.sizeProps.pc.baseWidth - this.sizeProps.pc.gaugeCapWidth,

                positionTweenL: null,
                positionTweenR: null,
            }
        },

        props: {
            min: {
                type: Number,
                default: 0
            },

            max: {
                type: Number,
                default: 2000
            },

            step: {
                type: Number,
                default: 1
            },

            /**
             * The ranges for displayed at initial render.
             * Note: Must be range in the min and max props.
             */
            initialRangeFrom: {
                type: Number,
                default: null
            },

            initialRangeTo: {
                type: Number,
                default: null
            },

            sizeProps: {
                type: Object,
                default: function () {
                    return {
                        mobile: {
                            baseWidth: 270,
                            gaugeCapWidth: 30,
                            gaugeKnobRadius: 12,
                        },
                        pc: {
                            baseWidth: 354,
                            gaugeCapWidth: 32,
                            gaugeKnobRadius: 14,
                        }
                    }
                }
            },
        },

        created() {
            this.rangePositionL = this.gaugeCapWidth;
            this.rangePositionR = this.baseWidth - this.gaugeCapWidth;
        },

        mounted() {
            this.emitChangeEvent();
            this.emitChangeCompleteEvent();
        },

        beforeDestroy() {
            TWEEN.removeAll();
        },

        watch: {
            min: function (newValue) {
                this.rangeFrom = this.rangeFrom < newValue ? newValue : this.rangeFrom;
                this.emitChangeEvent();
            },

            max: function (newValue) {
                this.rangeTo = this.rangeTo > newValue ? newValue : this.rangeTo;
                this.emitChangeEvent();
            },

            rangePositionL: function () {
                this.rangeFrom = this.$_UiRangeController_getSafeRangeFrom();
                this.emitChangeEvent();
                // console.log(`Pos: L = ${this.rangePositionL} <==> R = ${this.rangePositionR} `);
                // console.log(`Range: From = ${this.rangeFrom} <==> To = ${this.rangeTo} `);
            },

            rangePositionR: function () {
                this.rangeTo = this.$_UiRangeController_getSafeRangeTo();
                this.emitChangeEvent();
                // console.log(`Pos: L = ${this.rangePositionL} <==> R = ${this.rangePositionR} `);
                // console.log(`Range: From = ${this.rangeFrom} <==> To = ${this.rangeTo} `);
            },

            initialRangeFrom: function (newVal, oldVal) {
                if (oldVal !== null) {
                    // Assume to already initialized.
                    return;
                }

                if (newVal !== null && newVal >= this.rangeFrom) {
                    let rangeFrom = this.rangeFrom;
                    let posL = this.rangePositionL;

                    for (let counter = 0
                        ; newVal > rangeFrom && this.trialLoopMax > counter
                        ; posL += this.step, counter++
                    ) {
                        rangeFrom = this.$_UiRangeController_getSafeRangeFrom(posL);
                    }

                    const vm = this;
                    this.positionTweenL = new TWEEN.Tween({pos: this.rangePositionL})
                        .to({pos: posL}, 1000)
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .onUpdate((d) => {
                            vm.$_UiRangeController_updatePositionL(d.pos);
                        });
                }
            },

            initialRangeTo: function (newVal, oldVal) {
                if (oldVal !== null) {
                    // Assume to already initialized.
                    return;
                }

                if (newVal !== null && newVal <= this.rangeTo) {
                    let rangeTo = this.rangeTo;
                    let posR = this.rangePositionR;

                    for (let counter = 0
                        ; newVal < rangeTo && this.trialLoopMax > counter
                        ; posR -= this.step, counter++
                    ) {
                        rangeTo = this.$_UiRangeController_getSafeRangeFrom(posR);
                    }

                    const vm = this;
                    this.positionTweenR = new TWEEN.Tween({pos: this.rangePositionR})
                        .to({pos: posR}, 1000)
                        .easing(TWEEN.Easing.Quadratic.InOut)
                        .onUpdate((d) => {
                            vm.$_UiRangeController_updatePositionR(d.pos);
                        });
                }
            },

            isReadyToAnimate: function (newVal, oldVal) {
                if (!newVal) {
                    return;
                }

                const vm = this;

                this.positionTweenL
                    .chain(this.positionTweenR)
                    .onComplete(function () {
                        vm.emitChangeCompleteEvent();
                        TWEEN.removeAll();
                    })
                    .start();
                this.$_UiRangeController_animate();
            },
        },

        computed: {
            ChangeEvent: () => {
                return "range-changed";
            },

            ChangeCompleteEvent: () => {
                return "range-change-completed";
            },

            /**
             * Note: If difference between new position and current position are
             * greater than this value not update.
             */
            UpdateTriggerGap: () => {
                return 1;
            },

            trialLoopMax: () => {
                return 500;
            },

            changeRangeHandler: function () {
                return this.supportsTouch()
                    ? {
                        touchmove: ($e) => this.refreshRange($e),
                        touchend: ($e) => this.updateRangeComplete($e)
                    }
                    : {
                        mousemove: ($e) => this.refreshRange($e),
                        mouseup: ($e) => this.updateRangeComplete($e),
                        mouseleave: ($e) => this.updateRangeComplete($e)
                    };
            },

            fullGaugeWidth: function () {
                return this.baseWidth - (this.gaugeCapWidth * 2);
            },

            activeGaugeScope: function () {
                return {
                    x: this.rangePositionL,
                    width: this.rangePositionR - this.rangePositionL
                };
            },

            responsiveViewPort: function () {
                return this.isMobileScreen()
                    ? `0 0 ${this.sizeProps.mobile.baseWidth} 68`
                    : `0 0 ${this.sizeProps.pc.baseWidth} 68`
            },

            baseWidth: function () {
                return this.isMobileScreen()
                    ? this.sizeProps.mobile.baseWidth
                    : this.sizeProps.pc.baseWidth;
            },

            gaugeCapWidth: function () {
                return this.isMobileScreen()
                    ? this.sizeProps.mobile.gaugeCapWidth
                    : this.sizeProps.pc.gaugeCapWidth;
            },

            gaugeKnobRadius: function () {
                return this.isMobileScreen()
                    ? this.sizeProps.mobile.gaugeKnobRadius
                    : this.sizeProps.pc.gaugeKnobRadius;
            },

            rangeKnobPositionL: function () {
                return this.rangePositionL + this.gaugeKnobRadius;
            },

            rangeLabelPositionR: function () {
                return this.rangePositionR - (this.gaugeKnobRadius * 2);
            },

            rangeLabelPositionL: function () {
                if (this.rangePositionL > this.fullGaugeWidth - this.gaugeCapWidth) {
                    return this.fullGaugeWidth - this.gaugeCapWidth - this.gaugeKnobRadius;
                }
                return this.rangeFrom === this.rangeTo ? this.rangeLabelPositionR : this.rangePositionL;
            },

            isTooClosePosition: function () {
                return 72 >= this.rangePositionR - this.rangePositionL && this.rangeFrom !== this.rangeTo;
            },

            isReadyToAnimate: function () {
                return this.positionTweenL !== null && this.positionTweenR !== null;
            }
        },

        methods: {
            emitChangeEvent: function () {
                this.$emit(this.ChangeEvent, this.rangeFrom, this.rangeTo);
            },

            emitChangeCompleteEvent: function () {
                this.$emit(this.ChangeCompleteEvent, this.rangeFrom, this.rangeTo);
            },

            /**
             * Switch the active state of the left and right range control knobs.
             */
            activateControl: function (e, isLeft = false) {
                this.isActiveL = isLeft;
                this.isActiveR = !this.isActiveL;
            },

            /**
             *
             */
            updateRangeComplete: function (e) {
                const positionX = this.convertScreenToSvgView(e);
                if (this.isActiveL) {
                    this.$_UiRangeController_updatePositionL(positionX);
                } else if (this.isActiveR) {
                    this.$_UiRangeController_updatePositionR(positionX);
                }

                if (this.isActiveL || this.isActiveR) {
                    this.emitChangeCompleteEvent();
                }

                this.isActiveL = false;
                this.isActiveR = false;
            },

            /**
             * Note: It has adjust the throttle of refreshing,
             * for a reduce load.
             */
            refreshRange: throttle(function (e) {
                e.preventDefault();
                e.stopPropagation();

                if (this.isActiveL === this.isActiveR) {
                    // Terminate, cuz the both controls are same state.
                    return;
                }

                const positionX = this.convertScreenToSvgView(e);
                if (this.isActiveL === true) {
                    this.$_UiRangeController_updatePositionL(positionX);
                }
                if (this.isActiveR === true) {
                    this.$_UiRangeController_updatePositionR(positionX);
                }
            }, 100),

            /**
             * Return the value depends on the conditions.
             * @returns {number}
             */
            getSafePositionX: function (currentX, newX, minX = undefined, maxX = undefined) {
                if (Math.abs(currentX - newX) < this.UpdateTriggerGap) {
                    // Prevent too many update.
                    return currentX;
                }

                if (minX !== undefined && newX < minX) {
                    return minX;
                }
                if (maxX !== undefined && newX > maxX) {
                    return maxX;
                }

                return newX;
            },

            /**
             * Return computed x position for the svg view from the screen position.
             * @param event
             * @returns {number}
             */
            convertScreenToSvgView: function (event) {
                let screenX = 0;
                if (this.supportsTouch() && event instanceof TouchEvent) {
                    screenX = event.changedTouches[0].clientX;
                } else if (event instanceof MouseEvent) {
                    screenX = event.clientX;
                }

                //const svg = document.getElementById('range-control-svg');
                const svg = this.$el.querySelector('#range-control-svg');
                const targetSvgRect = svg.getBoundingClientRect();
                return parseInt(screenX - targetSvgRect.left);
            },

            $_UiRangeController_getSafeRangeFrom: function (positionL = null) {
                positionL = (positionL === null) ? this.rangePositionL : positionL;
                const distance = Math.abs(this.max - this.min);
                let rangeFrom = parseInt(distance * ((positionL - this.gaugeCapWidth) / this.fullGaugeWidth)) + this.min;
                // console.log(`Pos ratio: ${((this.rangePositionL - this.gaugeCapWidth) / this.fullGaugeWidth)}`);
                if (rangeFrom <= this.min) {
                    return this.min
                }
                if (rangeFrom > this.rangeTo) {
                    return this.rangeTo;
                }

                return rangeFrom;
            },

            $_UiRangeController_getSafeRangeTo: function (positionR = null) {
                positionR = (positionR === null) ? this.rangePositionR : positionR;
                const distance = Math.abs(this.max - this.min);
                let rangeTo = parseInt(distance * ((positionR - this.gaugeCapWidth) / this.fullGaugeWidth)) + this.min;
                if (rangeTo >= this.max) {
                    return this.max;
                }
                if (rangeTo < this.rangeFrom) {
                    return this.rangeFrom;
                }
                return rangeTo;
            },

            $_UiRangeController_updatePositionL: function (posX) {
                this.rangePositionL = this.getSafePositionX(
                    this.rangePositionL,
                    posX,
                    this.gaugeCapWidth,
                    this.rangePositionR
                );
            },

            $_UiRangeController_updatePositionR: function (posX) {
                this.rangePositionR = this.getSafePositionX(
                    this.rangePositionR,
                    posX,
                    this.rangePositionL,
                    this.baseWidth - this.gaugeCapWidth
                );
            },

            $_UiRangeController_animate: function () {
                let reqId = requestAnimationFrame(this.$_UiRangeController_animate);
                if (!TWEEN.update()) {
                    this.emitChangeCompleteEvent();
                    cancelAnimationFrame(reqId);
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/_variables.scss";

    .range-control-base {
        position: relative;
        width: 90%;
        height: 68px;
        @media (min-width: map-get($breakpoints, 'sm')) {
            width: 354px; // FIXME: This value definitions duplicate in the JS and SCSS
        }
    }

    .range-control-knob {
        fill: #ffffff;
        stroke: #aaaaaa;
        stroke-width: 6px;
        @include button-behavior();
    }

    .range-control-label {
        font-size: $font-size-md;
        font-family: $font-family-gothic;
        fill: $iro-grey-light;
        opacity: .7;
        @include prevent-user-select();
    }

    .range-control-gauge-base {
        fill: $iro-grey-light;
    }

    .range-control-gauge {
        fill: $iro-primary-light;
    }

    .range-control-knob__active {
        .range-control-knob {
            transition: fill .2s ease-out;
            fill: rgba($iro-accent, .7);
        }

        .range-control-label {
            opacity: 1;
        }
    }

    .range-control-knob__conceal {
        opacity: .3;
    }
</style>