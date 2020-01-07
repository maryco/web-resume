import {createLocalVue, mount, shallowMount} from "@vue/test-utils";

import UiPieChart from "@/components/ui/UiPieChart";

import {deviceStateMixin} from "@/core/mixins/deviceStateMixin";
import * as d3 from "d3";
import flushPromises from "flush-promises";
const localVue = createLocalVue();
localVue.mixin(deviceStateMixin);

const factoryWithProps = (props = {}, isShallow = false) => {
    return (isShallow)
        ? shallowMount(UiPieChart, {propsData: {...props}, localVue})
        : mount(UiPieChart, {propsData: {...props}, localVue});
};

const testScale = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(["data-01-key", "data-02-key", "data-03-key"]);
const testData = [
    {key: "data-01-key", label: "data-01-label", value:"1"},
    {key: "data-02-key", label: "data-02-label", value:"2"},
    {key: "data-03-key", label: "data-03-label", value:"3"},
];

const factoryWithTestData = (supportTouch = false, isShallow = false) => {
    const forceSupportsTouch = jest.fn(() => {
        return true;
    });
    const overrideMixins = (supportTouch) ? { supportsTouch: forceSupportsTouch} : {};

    return (isShallow)
        ? shallowMount(UiPieChart, {
            propsData: {chartData: testData, d3Scale: testScale},
            localVue,
            methods: overrideMixins
        })
        : mount(UiPieChart, {
            propsData: {chartData: testData, d3Scale: testScale},
            localVue,
            methods: overrideMixins
        });
};

describe("UiPieChart.vue.test.js", () => {
    it("created with required props", () => {
        const wrapper = factoryWithProps({chartData: [], d3Scale: () => {}});
        expect(wrapper).toBeTruthy();

        //pie-slice-arcs
        expect(wrapper.findAll('svg.pie-chart').length).toBe(1);
        expect(wrapper.findAll('g.pie-background').length).toBe(1);
        expect(wrapper.findAll('g.pie-slice-arcs').length).toBe(1);
        expect(wrapper.findAll('g.pie-slice-labels').length).toBe(1);
        expect(wrapper.findAll('g.pie-slice-label-pointers').length).toBe(1);

        // not render 'path' and 'text'
        expect(wrapper.findAll('g.pie-slice-arcs').isEmpty()).toBe(true);
        expect(wrapper.find('g.pie-slice-arcs path').exists()).toBe(false);
        expect(wrapper.find('g.pie-slice-labels text').exists()).toBe(false);
    });

    it("render with props of one data", () => {
        const testScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(["data-01-key"]);
        const testData = [
            {key: "data-01-key", label: "data-01-label", value:"1"}
        ];
        const wrapper = factoryWithProps({chartData: testData, d3Scale: testScale});
        expect(wrapper).toBeTruthy();

        // render 'path' and 'text'
        expect(wrapper.find('g.pie-slice-arcs path').exists()).toBe(true);
        expect(wrapper.find('g.pie-slice-labels text').exists()).toBe(true);

        const label = `${testData[0].label}(${testData[0].value})`;
        expect(wrapper.find('g.pie-slice-labels text').html()).toMatch(label);

    });

    it("render with props multiple data", () => {
        const wrapper = factoryWithTestData();
        expect(wrapper).toBeTruthy();

        // console.log(wrapper.find('g.pie-slice-arcs').html());
        // console.log(wrapper.find('g.pie-slice-labels').html());

        expect(wrapper.findAll('g.pie-slice-arcs path').length).toBe(3);
        expect(wrapper.findAll('g.pie-slice-labels text').length).toBe(3);
    });

    it("rerender when props data has changed", async () => {
        const testScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(["data-01-key"]);
        const testData1 = [
            {key: "data-01-key", label: "data-01-label", value:"1"}
        ];
        const wrapper = factoryWithProps({chartData: testData1, d3Scale: testScale});
        expect(wrapper).toBeTruthy();

        // first render
        const label1 = `${testData1[0].label}(${testData1[0].value})`;
        expect(wrapper.find('g.pie-slice-labels text').html()).toMatch(label1);

        // change "chartData" in props
        const testData2 = [
            {key: "data-aaa-key", label: "data-aaa-label", value:"9"}
        ];
        wrapper.setProps({chartData: testData2});
        await flushPromises();

        // second render
        const label2 = `${testData2[0].label}(${testData2[0].value})`;
        expect(wrapper.find('g.pie-slice-labels text').html()).toMatch(label2);
    });

    it("change focusedData by mouseover/out on specific arc", () => {
        const wrapper = factoryWithTestData();
        expect(wrapper).toBeTruthy();
        expect(wrapper.vm.focusedData).toBeFalsy();

        wrapper.findAll('g.pie-slice-arcs path').at(1).trigger("mouseover");
        expect(wrapper.vm.focusedData).not.toBe(undefined);
        expect(`${wrapper.vm.focusedData.value}`).toEqual(testData[1].value);

        wrapper.findAll('g.pie-slice-arcs path').at(1).trigger("mouseout");
        expect(wrapper.vm.focusedData).toBe(undefined);

        wrapper.findAll('g.pie-slice-arcs path').at(2).trigger("touchstart");
        expect(wrapper.vm.focusedData).toBe(undefined);
    });

    it("change focusedData by touchstart on specific arc", () => {
        const wrapper = factoryWithTestData(true);
        expect(wrapper).toBeTruthy();
        expect(wrapper.vm.focusedData).toBeFalsy();

        wrapper.findAll('g.pie-slice-arcs path').at(0).trigger("mouseover");
        expect(wrapper.vm.focusedData).toBe(undefined);

        wrapper.findAll('g.pie-slice-arcs path').at(2).trigger("touchstart");
        expect(wrapper.vm.focusedData).not.toBe(undefined);
        expect(`${wrapper.vm.focusedData.value}`).toEqual(testData[2].value);

        wrapper.findAll('g.pie-slice-arcs path').at(1).trigger("touchstart");
        expect(`${wrapper.vm.focusedData.value}`).toEqual(testData[1].value);

    });
});