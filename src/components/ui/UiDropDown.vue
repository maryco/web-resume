<template>
    <div class="dropdown-wrap">
        <button class="md-show contents-nav-scroller __up"
                v-on="scrollUpHandler"></button>
        <transition-group tag="ul"
                          class="contents-nav"
                          :class="{ 'dropdown__open': isOpen }"
                          :style="{ 'max-height': listMaxHeight}"
                          name="trans-dropdown-list">
            <li class="nav-item"
                :class="{ 'nav-item__selected': switchSelected(index, item.value) }"
                v-for="(item, index) in activeItems" v-bind:key="index">
                <a href="#" class="btn" role="button"
                   @click.prevent.stop="selected(item.value)">{{ item.label }}</a>
            </li>
        </transition-group>
        <div v-if="!isListMode" class="dropdown-controller">
            <button class="contents-nav-toggler"
                    @click.prevent.stop="toggleDropDown()"></button>
            <!--  TODO: Implements __up show/hide -->
            <button v-if="isOpen && items.length > openRowMax"
                    class="contents-nav-scroller __up"
                    v-on="scrollUpHandler"></button>
            <button v-if="isOpen && items.length > openRowMax"
                    class="contents-nav-scroller"
                    v-on="scrollDownHandler"></button>
        </div>
        <button v-if="items.length > openRowMax"
                class="md-show contents-nav-scroller"
                v-on="scrollDownHandler"></button>
    </div>
</template>

<script>
    import { scrollMixin } from "../../core/mixins/scrollMixin";
    import { mapActions, mapState } from "vuex";
    import { throttle } from "lodash";
    import TWEEN from "@tweenjs/tween.js";

    export default {
        name: "UiDropDown",
        mixins: [scrollMixin],

        data: function () {
            return {
                isOpen: false,
                selectedValue: null,
                isListMode: true,

                scrollDownTween: null,
                scrollUpTween: null,
            }
        },

        props: {
            items: {
                type: Array,
                default: () => [],
            },
            openRowMax: {
                type: Number,
                default: 5,
            },
            ignoreSameSelect: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            SelectedEvent: () => {
                return "selected";
            },

            ScrollDirection: () => {
                return {
                    UP: 1,
                    DOWN: 2
                };
            },

            ...mapState({
                isOverlayActive: state => state.appCommon.isOverlayActivated,
            }),

            listMaxHeight: function () {
                return `${(this.openRowMax + 1) * 50}px`;
            },

            activeItems: function () {
                if (this.isListMode || this.isOpen) {
                    return this.items;
                }

                return this.items.filter((d, i) => {
                    return d.value === this.selectedValue || this.selectedValue === null && i === 0;
                });
            },

            groundPositionY: function () {
                /**
                 *  Note: '88' has depend on the below styles.
                 *  .contents-nav{ padding-top:40 }
                 *  .nav-item{ height:40 + margin-bottom:8 }
                 */
                return 88;
            },

            scrollUpHandler: function () {
                return this.supportsTouch()
                    ? { touchstart: () => this.scrollItems(this.ScrollDirection.UP), touchend: () => this.stopScroll() }
                    : { mousedown: () => this.scrollItems(this.ScrollDirection.UP), mouseup: () => this.stopScroll() };
            },

            scrollDownHandler: function () {
                return this.supportsTouch()
                    ? { touchstart: () => this.scrollItems(this.ScrollDirection.DOWN), touchend: () => this.stopScroll() }
                    : { mousedown: () => this.scrollItems(this.ScrollDirection.DOWN), mouseup: () => this.stopScroll() };
            },
        },

        created() {
        },

        mounted() {
            window.addEventListener('resize', this.$_UiDroopDown_resetUi);
            this.$_UiDroopDown_resetUi();
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.$_UiDroopDown_resetUi);
        },

        watch: {
            selectedValue: function () {
                // Note: The watch methods seems only calls when value changed strict.
                this.$_UiDroopDown_emitSelected();
            },

            isOpen: function () {
                this.switchOverlayAction(this.isOpen);
            },

            /**
             * Force close when overlay has destroy.
             * @param newVal
             */
            isOverlayActive: function (newVal) {
                if (newVal === false && this.isOpen === true) {
                    this.isOpen = false;
                }
            },
        },

        methods: {
            ...mapActions([
                'switchOverlayAction',
            ]),

            selected(val) {
                // Note: Watch method seems not execute if passed new value equals old value.
                // So emit "selected" event by self, if initialized with "not ignore the same value select".
                if (!this.ignoreSameSelect && this.selectedValue === val) {
                    this.$_UiDroopDown_emitSelected();
                }
                this.selectedValue = val;
                this.isOpen = false;
            },

            toggleDropDown() {
                this.isOpen = !this.isOpen;
            },

            switchSelected(listIndex, val) {
                if (listIndex === 0 && this.selectedValue === null) {
                    this.selectedValue = val;
                    return true;
                }

                return this.selectedValue === val;
            },

            scrollItems: throttle(function (direction) {
                if (direction !== this.ScrollDirection.UP
                    && direction !== this.ScrollDirection.DOWN) {
                    return;
                }

                const listElm = this.$el.querySelector("ul");
                if (direction === this.ScrollDirection.UP) {
                    if (!this.scrollUpTween) {
                        this.scrollUpTween = this.generateScrollElmTween(listElm, -5);
                    }
                    if (listElm.scrollTop <= 0) {
                        return
                    }

                    this.scrollUpTween.start();

                } else if (direction === this.ScrollDirection.DOWN) {
                    if (!this.scrollDownTween) {
                        this.scrollDownTween = this.generateScrollElmTween(listElm, 5);
                    }
                    if (listElm.scrollTop > 32 * this.items.length) {
                        return;
                    }

                    this.scrollDownTween.start();
                }

                this.$_UiDroopDown_animate();
            }, 1000),

            scrollUp() {
                const listElm = this.$el.querySelector("ul");
                if (!this.scrollUpTween) {
                    this.scrollUpTween = this.generateScrollElmTween(listElm, -5);
                }

                if (listElm.scrollTop <= 0) {
                    return
                }

                this.scrollUpTween.start();
                this.$_UiDroopDown_animate();
            },

            scrollDown() {
                const listElm = this.$el.querySelector("ul");
                if (!this.scrollDownTween) {
                    this.scrollDownTween = this.generateScrollElmTween(listElm, 5);
                }

                if (listElm.scrollTop > 32 * this.items.length) {
                    return;
                }

                this.scrollDownTween.start();
                this.$_UiDroopDown_animate();
            },

            stopScroll() {
                if (this.scrollUpTween) {
                    this.scrollUpTween.stop();
                }
                if (this.scrollDownTween) {
                    this.scrollDownTween.stop();
                }
            },

            $_UiDroopDown_animate: function () {
                let reqId = requestAnimationFrame(this.$_UiDroopDown_animate);
                if (!TWEEN.update()) {
                    cancelAnimationFrame(reqId)
                }
            },

            /**
             * Emit event with the selected item's position Y and value
             */
            $_UiDroopDown_emitSelected: function () {
                const rect = this.$el.getBoundingClientRect();
                this.$emit(this.SelectedEvent, rect.top + this.groundPositionY, this.selectedValue);
            },

            $_UiDroopDown_resetUi: throttle(function () {
                if (this.isMobileScreen()) {
                    this.isListMode = false;
                } else {
                    this.isListMode = true;
                    if (this.isOverlayActive) {
                        this.switchOverlayAction(false);
                    }
                }
            }, 1000),
        }
    }
</script>

<style lang="scss" scoped>
    .trans-dropdown-list-enter-active, .trans-dropdown-list-leave-active {
        transition: all .5s ease-out;
    }
    .trans-dropdown-list-enter, .trans-dropdown-list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
</style>