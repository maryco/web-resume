<template>
    <header>
        <svg :viewBox="`0 0 ${containerWidth} ${containerHeight}`"
             :class="$style.headerbg"
             preserveAspectRatio="none">
            <defs>
                <filter id="header-banner__shadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur"/>
                    <feOffset dy="-6"></feOffset>
                    <feMerge>
                        <feMergeNode></feMergeNode>
                        <feMergeNode in="SourceGraphic"></feMergeNode>
                    </feMerge>
                </filter>
            </defs>
            <mask id="circle-mask">
                <path :d="bannerPoints" fill="#fff"></path>
            </mask>
            <path :class="$style.gBanner" :d="bannerPoints" filter="url(#header-banner__shadow)"></path>
            <circle :class="$style.gCircle"
                    cx="80%" cy="0" r="50%"
                    mask="url(#circle-mask)"
                    filter="url(#header-banner__shadow)"></circle>
        </svg>
        <div class="header-container">
            <UiRangeController
                    :min="termRangeMinYear"
                    :max="termRangeMaxYear"
                    :initial-range-from="defaultStartFrom"
                    :initial-range-to="defaultStartTo"
                    v-on:range-change-completed="onRangeChangeCompleted"></UiRangeController>
            <div class="header-title">
                <h1>JOB RESUME</h1>
            </div>
        </div>
    </header>
</template>

<script>
    import UiRangeController from "../ui/UiRangeController";
    import {mapActions, mapGetters, mapState} from "vuex";

    export default {
        name: "Header",
        components: {UiRangeController},

        props: {
            containerWidth: {
                type: Number,
                default: 1200
            },
            containerHeight: {
                type: Number,
                default: 270
            }
        },

        computed: {
            ...mapState({
                defaultStartFrom: state => state.jobResume.defaultStartFrom,
                defaultStartTo: state => state.jobResume.defaultStartTo
            }),

            ...mapGetters([
                'termRangeMinYear',
                'termRangeMaxYear'
            ]),

            bannerPoints: function () {
                return `M 0 0 L 0 ${this.containerHeight - 10} L ${this.containerWidth} 134 L ${this.containerWidth} 0`;
            }
        },

        mounted() {
        },

        created() {
        },

        watch: {
        },

        methods: {
            ...mapActions(['changeTermAction']),

            onRangeChangeCompleted: function (from, to) {
                this.changeTermAction({from: from, to: to});
            },

            // Note: Run too often re rendering, If listen the change-events
            // onRangeChanged: function (from, to) {
            //     console.log(`Range change changed!!`);
            //     // this.changeTermAction({from: from, to: to});
            // }
        }
    }
</script>

<style lang="scss" module>
    @import "../../assets/scss/_variables.scss";

    .headerbg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .gBanner {
        fill: $iro-primary;
    }

    .gCircle {
        fill: rgba($iro-primary-light, .7);
        opacity: .6;
    }
</style>