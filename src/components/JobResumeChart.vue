<template>
    <div class="contents-container">
        <div class="card-container">
            <div class="card" v-for="(item, index) in chartData" v-bind:key="index">
                <div class="card-title">
                    <h2 :id="$_JobResumeChart_makeTopicId(item.topic)" :style="jaStyles">{{ localeText(item.topic) }}</h2>
                </div>
                <div class="card-body">
                    <UiPieChart
                            v-if="Array.isArray(item.data)"
                            :d3-scale="item.scale"
                            :chart-data="item.data"></UiPieChart>
                </div><!--.//.card-body -->
            </div><!--.//.card -->
        </div><!--//.card-container-->
        <div class="contents-nav-container">
            <UiDropDown :items="topicDropDown"
                        :open-row-max="4"
                        v-on:selected="moveToTopic"></UiDropDown>
        </div><!--//.contents-nav-->
    </div><!--//.contents-container-->
</template>

<script>
    import {mapState, mapActions, mapGetters} from 'vuex';
    import * as d3 from "d3";

    import {stringUtilMixin} from "../core/mixins/stringUtilMixin";
    import {localeMixin} from "../core/mixins/localeMixin";
    import {scrollMixin} from "../core/mixins/scrollMixin";
    import UiPieChart from "./ui/UiPieChart";
    import UiDropDown from "./ui/UiDropDown";
    import {JobResumeConfig as resumeConf} from '../config/JobResumeChart.config';

    export default {
        name: "JobResumeChart",
        components: {UiDropDown, UiPieChart},
        mixins: [stringUtilMixin, localeMixin, scrollMixin],

        data: function () {
            return {
                /**
                 * Original fetched data from json.
                 */
                sourceData: null,

                /**
                 * The data set that filtered and aggregated for generate chart.
                 */
                chartData: [],

                /**
                 * The Label and values for the dropdown
                 * i.e
                 * webServers: {
                 *     label: "Web Servers",
                 *     value: "chart-web-servers"
                 * }
                 */
                topicDropDown: [],

                /**
                 * Mapping for the label and refer label key.
                 * cuz if use label for the key, I worried about issues
                 * by if label has contains multi-byte character)
                 * i.e
                 * database: {
                 *    "database_aaaaaaaa": "MySQL"
                 *    "database_bbbbbbbb": "None"
                 * },
                 */
                labelKeyMap: {},
            }
        },

        props: {},

        computed: {
            // It's trigger for a render the charts.
            ...mapState({
                termStartFrom: state => state.jobResume.termStartFrom,
                termStartTo: state => state.jobResume.termStartTo
            }),

            ...mapGetters([
                'termStartFromDate',
                'termStartToDate',
                'termRangeMinYear',
                'termRangeMaxYear',
            ]),

            /**
             *
             * @returns {[number, number]|[number, number]}
             */
            initialTerms: function () {
                let from = resumeConf.presentation.initialShowRange.from;
                if (!from || this.termRangeMinYear >= from ||  this.termRangeMaxYear <= from) {
                    from = this.termRangeMinYear;
                }
                let to = resumeConf.presentation.initialShowRange.to;
                if (!to || this.termRangeMinYear >= to ||  this.termRangeMaxYear <= to) {
                    to = this.termRangeMaxYear;
                }

                if (from > to) {
                    return [+this.termRangeMinYear, +this.termRangeMaxYear];
                }
                return [from, to];
            },

            jaStyles: function () {
                return this.isJa ? {'font-weight': 'normal'} : {};
            }
        },

        watch: {
            termStartFrom: function () {
                this.generateChartModel();
            },
            termStartTo: function () {
                this.generateChartModel();
            }
        },

        created() {
        },

        mounted() {
            // Note: If observe by the subscribe method.
            //  @see https://vuex.vuejs.org/ja/api/#subscribe
            // this.$store.subscribe((mutation, state) => {
            //     if (mutation.type === "setTerm") {
            //         console.log(`Subscribed !! termStartFrom = ${state.jobResume.termStartFrom}`);
            //     }
            // });

            // Initialize data.
            resumeConf.aggregate.topicKeys.forEach((topicKey) => {
                this.topicDropDown.push({
                        label: this.localeText(topicKey),
                        value: this.$_JobResumeChart_makeTopicId(topicKey),
                    });

                this.labelKeyMap[topicKey] = {};
            });

            this.fetchData();
        },

        methods: {
            ...mapActions(['changeTermRangeAction', 'changeDefaultTermAction']),

            async fetchData() {
                const data = await d3.json("./resources/json/resume.json");
                this.sourceData = data;

                // Update term range by the fetched data.
                const vm = this;
                if (this.sourceData) {
                    const extent = d3.extent(this.sourceData.projects, (d) => {
                        return (vm.isProbablyDateFormat(d.outline.termFrom))
                            ? d.outline.termFrom
                            : "1970-01-01";
                    });

                    await this.changeTermRangeAction({min: extent[0], max: extent[1]});

                    // Set term ranges for initial display.
                    await this.changeDefaultTermAction({from: this.initialTerms[0], to: this.initialTerms[1]});
                }

                this.generateChartModel();
            },

            /**
             *
             * @returns {boolean}
             */
            generateChartModel: function () {
                if (!this.sourceData) {
                    return false;
                }
                // console.log(`Gen chart data ${this.termStartFrom} - ${this.termStartTo}`);

                const vm = this;

                // Filtering by the project term's "from date".
                const filtered = this.sourceData.projects.filter((data) => {
                    // Force skip.
                    if (data.skip === true) {
                        return false;
                    }

                    let withinRange = true;
                    const termFromDate = new Date(`${data.outline.termFrom}`);
                    if (vm.termStartFromDate !== null) {
                        withinRange = termFromDate.valueOf() >= vm.termStartFromDate.valueOf();
                    }
                    if (withinRange && vm.termStartToDate !== null) {
                        withinRange = termFromDate.valueOf() < vm.termStartToDate.valueOf();
                    }

                    return withinRange;
                });

                if (!filtered || filtered.length === 0) {
                    // Build empty data.
                    this.chartData = [];
                    resumeConf.aggregate.topicKeys.forEach((topic) => {
                        this.chartData.push(this.$_JobResumeChart_packDataForChart([], topic));
                    });
                    return;
                }

                this.chartData = [];
                let aggregated = {};

                filtered.forEach((d) => {
                    const manHour = this.$_JobResumeChart_getManHour(d.outline);

                    resumeConf.aggregate.topicKeys.forEach((topic) => {
                        let tmpData = (`${topic}` in aggregated) ? aggregated[topic] : {};

                        if (`${topic}` in d.outline) {
                            tmpData = this.$_JobResumeChart_buildTopicModel(
                                d.outline[[topic]], topic, manHour, tmpData);
                        }

                        if (`${topic}` in d.technicalDetails) {
                            tmpData = this.$_JobResumeChart_buildTopicModel(
                                d.technicalDetails[[topic]], topic, manHour, tmpData);
                        }

                        if (`${topic}` in d.developmentTools) {
                            tmpData = this.$_JobResumeChart_buildTopicModel(
                                d.developmentTools[[topic]], topic, manHour, tmpData);
                        }

                        aggregated[topic] = tmpData;
                    });
                });

                // Pack each topic data for the pie chart.
                resumeConf.aggregate.topicKeys.forEach((topic) => {
                    this.chartData.push(this.$_JobResumeChart_packDataForChart(aggregated[[topic]], topic));
                });
            },

            /**
             *
             * @param {number} basePosY It's take as base vertical position
             * @param {string} val Id for the target element to scroll.
             */
            moveToTopic: function (basePosY, val) {
                const target = this.$el.querySelector(`#${val}`);
                if (!target) {
                    return;
                }

                this.scrollWindow(target.offsetTop - (basePosY));
            },

            $_JobResumeChart_packDataForChart: function (d, topic) {
                // Sort by the label.
                // (Because it seems d3.values() has return array of order undefined.)
                // https://github.com/d3/d3-collection/blob/v1.0.7/README.md#values
                const sorted = d3.values(d).sort((a, b) => {
                    return a.label > b.label ? 1 : -1;
                });

                const scale = d3.scaleOrdinal()
                    .domain(sorted.map(d => d.key))
                    .range(resumeConf.presentation.scaleColors);

                return {
                    topic: topic,
                    scale: scale,
                    data: sorted,
                };
            },

            $_JobResumeChart_makeTopicId(topic) {
                return `chart-${this.camelToKebab(topic)}`;
            },

            $_JobResumeChart_buildTopicModel: function (d, topic, manHour, dataBag) {
                d.forEach(label => {
                    dataBag[[label]] = (`${label}` in dataBag)
                        ? this.$_JobResumeChart_createDataModel(topic, label,
                            dataBag[[label]].value + manHour,
                            dataBag[[label]].key)
                        : this.$_JobResumeChart_createDataModel(topic, label,
                            manHour,
                            null)
                    ;
                });
                return dataBag;
            },

            $_JobResumeChart_createDataModel: function (topic, label, value = 0, key = null) {
                if (key === null) {
                    // Load stored key for specified label, or generate new key and save.
                    Object.keys(this.labelKeyMap[[topic]]).forEach(labelKey => {
                        if (this.labelKeyMap[[topic]][labelKey] === label) {
                            key = labelKey;
                        }
                    });
                    if (key === null) {
                        key = `${topic}_${this.generateRandomString(8)}`;
                        this.labelKeyMap[[topic]][[key]] = label;
                    }
                }

                return {
                    key: key,
                    label: `${label}`,
                    value: value,
                };
            },

            $_JobResumeChart_getManHour: function (outline) {
                if (outline.manHour > 0) {
                    return outline.manHour;
                }

                const termFromDate = (outline.termFrom) ? new Date(`${outline.termFrom}`) : new Date();
                const termToDate = (outline.termTo) ? new Date(`${outline.termTo}`) : new Date();

                if (termFromDate > termToDate) {
                    console.warn(`Invalid project term. (${outline.name})`);
                    return 0;
                }

                const days = (termToDate.getTime() - termFromDate.getTime()) / (1000 * 60 * 60 * 24);
                // console.log(`From = ${outline.termFrom} To = ${outline.termTo} Days = ${days}`);

                return days * resumeConf.aggregate.workHourPerDay;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>