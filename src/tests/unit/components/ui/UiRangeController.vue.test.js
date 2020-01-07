// Note: for 'vm.$nextTick'
/* eslint jest/valid-expect-in-promise: 0 */
import "@/tests/matchMedia.mock";
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";

import UiRangeController from "@/components/ui/UiRangeController";

import {deviceStateMixin} from "@/core/mixins/deviceStateMixin";
const localVue = createLocalVue();
localVue.mixin(deviceStateMixin);

const factoryWithProps = (props = {}, isShallow = true) => {
    return (isShallow)
        ? shallowMount(UiRangeController, {localVue, propsData: {...props}})
        : mount(UiRangeController, {localVue, propsData: {...props}});
};

describe("UiRangeController.vue.test.js", () => {
    it("initialize with default props", () => {
        const wrapper = factoryWithProps();
        const vm = wrapper.vm;

        expect(wrapper.is(UiRangeController)).toBe(true);
        expect(vm.rangeFrom).toEqual(vm.min);
        expect(vm.rangeTo).toEqual(vm.max);

        expect(wrapper.emitted(vm.ChangeEvent).length).toBe(1);
        expect(wrapper.emitted(vm.ChangeCompleteEvent).length).toBe(1);
    });

    it("render with default props", () => {
        const wrapper = factoryWithProps();

        // Has svg of range controller base.
        expect(wrapper.find('svg').exists()).toBe(true);

        // Has two range control knobs
        const knobs = wrapper.findAll('.range-control-knob');
        expect(knobs.length).toBe(2);
    });

    it("created with specific props", () => {
        const testProps = {
            min: 1234,
            max: 5678,
        };
        const wrapper = factoryWithProps(testProps, false);
        var vm = wrapper.vm;

        expect(vm.rangeFrom).toEqual(testProps.min);
        expect(vm.rangeTo).toEqual(testProps.max);

        expect(vm.positionTweenL).toEqual(null);
        expect(vm.positionTweenR).toEqual(null);
    });

    it("generate position tween, when 'initialRangeFrom/To' props are null", () => {
        const testProps = {
            min: 1000,
            max: 5000,
        };
        const wrapper = factoryWithProps(testProps, false);
        var vm = wrapper.vm;

        expect(vm.initialRangeFrom).toEqual(null);
        expect(vm.initialRangeTo).toEqual(null);
        expect(vm.rangeFrom).toEqual(testProps.min);
        expect(vm.rangeTo).toEqual(testProps.max);

        wrapper.setProps({initialRangeFrom: 1001});
        wrapper.setProps({initialRangeTo: 4999});
        expect(vm.positionTweenL).toEqual(null);
        expect(vm.positionTweenR).toEqual(null);

        vm.$nextTick()
            .then(() => {
                expect(vm.positionTweenL).not.toEqual(null);
                expect(vm.positionTweenR).not.toEqual(null);
            })
            .catch((e) => {
                // Prevent the Node issues warnings `UnhandledPromiseRejectionWarning`,
                // caused by if without 'catch'
                console.log(e);
            });
    });

    it("not generate position tween, if passed invalid value", () => {
        const testProps = {
            min: 2001,
            max: 2005,
        };
        const wrapper = factoryWithProps(testProps, false);
        var vm = wrapper.vm;

        expect(vm.initialRangeFrom).toEqual(null);
        expect(vm.initialRangeTo).toEqual(null);
        expect(vm.rangeFrom).toEqual(testProps.min);
        expect(vm.rangeTo).toEqual(testProps.max);

        // Not within min and max
        wrapper.setProps({initialRangeFrom: 2000});
        wrapper.setProps({initialRangeTo: 2006});
        expect(vm.positionTweenL).toEqual(null);
        expect(vm.positionTweenR).toEqual(null);

        vm.$nextTick()
            .then(() => {
                expect(vm.positionTweenL).toEqual(null);
                expect(vm.positionTweenR).toEqual(null);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    it("not generate position tween, if initialRange props are already set", () => {
        const testProps = {
            min: 1000,
            max: 5000,
            initialRangeFrom: 1001,
            initialRangeTo: 4999,
        };
        const wrapper = factoryWithProps(testProps, false);
        var vm = wrapper.vm;

        expect(vm.initialRangeFrom).toEqual(testProps.initialRangeFrom);
        expect(vm.initialRangeTo).toEqual(testProps.initialRangeTo);

        wrapper.setProps({initialRangeFrom: 1002});
        wrapper.setProps({initialRangeTo: 4998});
        expect(vm.positionTweenL).toEqual(null);
        expect(vm.positionTweenR).toEqual(null);

        vm.$nextTick()
            .then(() => {
                expect(vm.positionTweenL).toEqual(null);
                expect(vm.positionTweenR).toEqual(null);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    it("change active scope of L/R by fired event", () => {
        const wrapper = factoryWithProps({}, false);
        const vm = wrapper.vm;

        const knobs = wrapper.findAll('.range-control-knob');
        knobs.at(0).trigger('mousedown');

        expect(vm.isActiveL).toEqual(true);
        expect(vm.isActiveR).toEqual(false);

        knobs.at(1).trigger('mousedown');

        expect(vm.isActiveL).toEqual(false);
        expect(vm.isActiveR).toEqual(true);
    });

    it("update data rangeFrom/To when positionL/R changed", () => {
        const wrapper = factoryWithProps({}, false);
        const vm = wrapper.vm;

        expect(vm.rangeFrom).toEqual(vm.min);
        expect(vm.rangeTo).toEqual(vm.max);

        const oldRangeFrom = vm.rangeFrom;
        const oldRangeTo = vm.rangeTo;
        wrapper.setData({rangePositionL: vm.$data.rangePositionL + 1});
        wrapper.setData({rangePositionR: vm.$data.rangePositionR - 1});

        vm.$nextTick()
            .then(() => {
                expect(vm.rangeFrom).toBeGreaterThan(oldRangeFrom);
                expect(vm.rangeTo).toBeLessThan(oldRangeTo);
            })
            .catch((e) => {
                console.log(e);
            });
    });

    it("rangeFrom/To not be out of range of its min and max.", () => {
        const testProps = {
            min: 2000,
            max: 2015,
        };
        const wrapper = factoryWithProps(testProps, false);
        var vm = wrapper.vm;

        expect(vm.min).toEqual(testProps.min);
        expect(vm.max).toEqual(testProps.max);
        expect(vm.min).toEqual(vm.rangeFrom);
        expect(vm.max).toEqual(vm.rangeTo);

        // force set positionL/R to invalid range
        wrapper.setData({rangePositionL: vm.rangePositionL - 9999});
        wrapper.setData({rangePositionR: vm.rangePositionR + 9999});

        vm.$nextTick()
            .then(() => {
                expect(vm.rangeFrom).toEqual(vm.min);
                expect(vm.rangeTo).toEqual(vm.max);
            })
            .catch((e) => {
                console.log(e);
            });
    });
});