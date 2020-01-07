<template>
    <svg class="pie-chart" :viewBox="baseViewBox" :width="svgWidth" :height="svgHeight" preserveAspectRatio="xMinYMid">
        <filter id="pie-slice__shadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur"/>
            <feOffset dy="2" dx="2"></feOffset>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge>
                <feMergeNode></feMergeNode>
                <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
        </filter>
        <g>
            <g class="pie-background">
                <circle :r="284 / 2" cx="50%" cy="50%" class="pie-chart-circle__light chart__ux-reflect"></circle>
                <circle :r="214 / 2" cx="50%" cy="50%" class="pie-chart-circle__light"></circle>
                <circle :r="114 / 2" cx="50%" cy="50%" class="pie-chart-circle__light chart__center"></circle>
            </g>
            <g class="pie-slice-arcs"></g>
            <g class="pie-slice-labels"></g>
            <g class="pie-slice-label-pointers"></g>
        </g>
    </svg>
</template>

<script>
    import * as d3 from "d3";

    export default {
        name: "UiPieChart",
        data: function () {
            return {
                chartBaseArc: undefined,
                d3Pie: undefined,
                focusedData: undefined,
            }
        },
        props: {
            chartData: {
                type: Array,
                required: true,
            },
            d3Scale: {
                type: Function,
                required: true,
            },
            baseWidth: {
                type: Number,
                default: 388
            },
            baseHeight: {
                type: Number,
                default: 306
            },
            chartSize: {
                type: Object,
                default: function () {
                    return {
                        inner: 168,
                        outer: 226,
                    };
                }
            }
        },

        computed: {
            baseViewBox: function () {
                return `0 0 ${this.baseWidth} ${this.baseHeight}`;
            },
            svgWidth: function () {
                return this.isIE() ? this.baseWidth : "100%";
            },
            svgHeight: function () {
                return this.isIE() ? this.baseHeight : "100%";
            },
            labelTextDy: () => {
                return "-0.5em";
            }
        },

        watch: {
            chartData: function (newData, oldData) {
                if (!Array.isArray(newData)) {
                    return;
                }
                this.renderChart();
            },

            focusedData: function (newVal, oldVal) {
                if (newVal === oldVal) {
                    return;
                }

                if (newVal === undefined) {
                    this.resetFocus();
                    return;
                }

                if (oldVal !== undefined) {
                    this.resetFocus();
                }

                this.focusData(newVal);
            }
        },

        created() {
        },

        mounted() {
            this.renderChart();
        },

        methods: {
            refDataKey: (d) => {
                    return d.data.key;
            },

            /**
             * Adjust x position to the left or right, from center of the Chart.
             *
             * @param pos
             * @typedef {[number, number]} number[x, y]
             * @returns {[number, number]} number[x, y]
             */
            labelOuterPos: function (pos) {
                pos[0] = pos[0] <= 0 ? -(this.baseWidth / 2 - 20) : (this.baseWidth / 2 - 20);
                return pos;
            },

            /**
             *  Render all chart elements.
             */
            renderChart: function () {
                if (this.focusedData) {
                    d3.select(this.$el).select("circle.chart__ux-reflect")
                        .attr("style", `stroke:`);
                }

                this.d3Pie = d3.pie(this.chartData)
                    .sort(null)
                    .value(function (d) {
                        return d.value;
                    });

                this.chartBaseArc = d3.arc()
                    .innerRadius(this.chartSize.inner / 2)
                    .outerRadius(this.chartSize.outer / 2);

                const vm = this;

                const gSlices = d3.select(this.$el).select("g.pie-slice-arcs")
                    .attr("transform", `translate(${this.baseWidth / 2}, ${this.baseHeight / 2})`);

                let pieSlices = gSlices.selectAll("path.pie-slice")
                    .data(this.d3Pie(this.chartData), this.refDataKey);

                pieSlices.enter()
                    .append("path")
                    //  Note:
                    //  The enter, update, and exit pattern changed slightly in d3.js v4.
                    //  You now need to incorporate the .merge statement.
                    //  @see https://stackoverflow.com/a/40024895
                    .merge(pieSlices)
                    .style("fill", function (d) {
                        return vm.d3Scale(d.data.key);
                    })
                    .attr("filter", "url('#pie-slice__shadow')")
                    .attr("class", "pie-slice")
                    //.attr("d", vm.chartBaseArc)
                    .on(vm.supportsTouch() ? "touchstart" : "mouseover", function (d) {
                         // console.log(d);    // Generated by D3 data
                         // console.log(this); // DOM Element (path)
                        vm.focusedData = d;
                    }, { passive: true })
                    .on("mouseout", function (d) {
                        if (vm.supportsTouch()) {
                            return;
                        }
                        vm.focusedData = undefined;
                    })
                    .transition()
                    .duration(500)
                    .attrTween("d", function (d) {
                        this._current = this._current || d;
                        var interpolate = d3.interpolate(this._current, d);
                        this._current = interpolate(0);
                        return function(t) {
                            const tmpArc  = d3.arc()
                                .innerRadius(vm.chartBaseArc.innerRadius())
                                .outerRadius(vm.chartBaseArc.outerRadius());
                            return tmpArc({...interpolate(t)});
                            // Error: <path> attribute d: Expected moveto path command ('M' or 'm'), "function arc() {…".
                            // return d3.arc(interpolate(t));
                        };
                    });

                // Note: It's means merge new item and old item?
                // @see https://github.com/d3/d3-selection/blob/v1.4.1/README.md#selection_exit
                pieSlices.exit().remove();

                this.renderLabelParts();
            },

            /**
             *  Render labels for the pie slices
             *  by the current data.
             */
            renderLabelParts: function () {
                if (!this.d3Pie) {
                    return;
                }

                const vm = this;

                /**
                 * Data Label Text
                 */
                const gLabels = d3.select(this.$el).select("g.pie-slice-labels")
                    .attr("transform", `translate(${this.baseWidth / 2}, ${this.baseHeight / 2})`);

                let labels = gLabels.selectAll("text.pie-label-text")
                    .data(this.d3Pie(this.chartData), this.refDataKey);

                labels.enter()
                    .append("text")
                    .merge(labels)
                    .text(function (d) {
                        return `${d.data.label}(${d.data.value})`;
                    })
                    .attr("class", "pie-label-text")
                    .attr("dy", this.labelTextDy)
                    .attr("transform", "translate(0, 0)")
                    .attr("transform", function (d) {
                        return `translate(${vm.labelOuterPos(vm.chartBaseArc.centroid(d))})`;
                    })
                    .attr("text-anchor", function (d) {
                        return vm.chartBaseArc.centroid(d)[0] <= 0 ? "start" : "end";
                    });

                labels.exit().remove();

                /**
                 * Polyline for connect to each data labels and pie-slices
                 */

                const gLabelPointers = d3.select(this.$el).select("g.pie-slice-label-pointers")
                    .attr("transform", `translate(${this.baseWidth / 2}, ${this.baseHeight / 2})`);

                var lines = gLabelPointers.selectAll("polyline.pie-label-polyline")
                    .data(this.d3Pie(this.chartData), this.refDataKey);

                lines.enter()
                    .append("polyline")
                    .merge(lines)
                    .attr("class", "pie-label-polyline")
                    .attr("points", function (d) {
                        return [
                            vm.chartBaseArc.centroid(d),
                            vm.labelOuterPos(vm.chartBaseArc.centroid(d))
                        ];
                    });

                lines.exit().remove();
            },

            /**
             *
             */
            focusData: function (targetData) {
                const vm = this;
                const rangeColor = this.d3Scale.range()[targetData.index];

                const labelPointerInnerPos = function (pos) {
                    // Adjust center position, for prevent overlap to the label.
                    return [0, pos[1] > -25 ? 10 : -20];
                };

                // Set the outer circle color to focused data scale-color.
                d3.select(this.$el).select("circle.chart__ux-reflect")
                    .attr("style", `stroke: ${rangeColor};`);

                let targetLabelText = d3.select(this.$el).selectAll("text").filter((d) => {
                    return d.data.key === targetData.data.key;
                });

                if (!targetLabelText.empty()) {
                    targetLabelText
                        .attr("transformInitial", targetLabelText.attr("transform"))
                        .attr("textAnchorInitial", targetLabelText.attr("text-anchor"))
                        .attr("dy", "0")
                        .attr("text-anchor", "middle")
                        .transition()
                        .duration(300)
                        .attr("transform", "translate(0, 0) scale(1.5)");
                }

                let targetLabelPointer = d3.select(this.$el).selectAll("polyline").filter((d) => {
                    return d.data.key === targetData.data.key;
                });

                if (!targetLabelPointer.empty()) {
                    targetLabelPointer
                        .attr("pointsInitial", targetLabelPointer.attr("points"))
                        .transition()
                        .duration(300)
                        .attr("points", function (d) {
                            return [
                                vm.chartBaseArc.centroid(d),
                                labelPointerInnerPos(vm.chartBaseArc.centroid(d))
                            ];
                        });
                }
            },

            /**
             *
             */
            resetFocus: function () {
                const vm = this;

                d3.select(this.$el)
                    .select("circle.chart__ux-reflect")
                    .attr("style", "stroke:");

                d3.select(this.$el).selectAll("text").select(function () {
                    let label = d3.select(this)
                        .attr("dy", vm.labelTextDy)
                        .interrupt();   // Cancel transition.

                    if (label.attr("transformInitial") !== null) {
                        label.attr("transform", label.attr("transformInitial"));
                        label.attr("transformInitial", null);
                    }
                    if (label.attr("textAnchorInitial") !== null) {
                        label.attr("text-anchor", label.attr("textAnchorInitial"));
                        label.attr("textAnchorInitial", null);
                    }
                });

                d3.select(this.$el).selectAll("polyline").select(function () {
                    let polyLine = d3.select(this)
                        .interrupt();   // Cancel transition.

                    if (polyLine.attr("pointsInitial") !== null) {
                        polyLine.attr("points", polyLine.attr("pointsInitial"));
                        polyLine.attr("pointsInitial", null);
                    }
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/_variables.scss";

    .pie-slice {
        @include button-behavior;
    }

    .pie-slice-arcs {
        cursor: pointer;
        &:focus {
            outline: none;
        }
        -webkit-tap-highlight-color: transparent;
    }

    .chart__ux-reflect {
        transition: stroke 300ms ease-out;
    }

    .pie-chart-circle__light {
        stroke-width: 18px;
        stroke: rgb(234, 234, 232);
        opacity: .5;
        fill: none;
    }

    .pie-slice-labels {
        fill: $iro-text;
        font-size: $font-size-sm;
        font-family: $font-family-gothic;
        @include prevent-user-select();
    }

    .pie-slice-label-pointers {
        stroke: $iro-grey-dark;
        stroke-width: .04rem;
    }
</style>