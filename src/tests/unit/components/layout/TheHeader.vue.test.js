import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import "@/tests/matchMedia.mock";

import Header from "@/components/layout/TheHeader";
import UiRangeController from "@/components/ui/UiRangeController";
import {JobResumeConfig as resumeConf} from '@/config/JobResumeChart.config';

import store from "@/store";
import {deviceStateMixin} from "@/core/mixins/deviceStateMixin";
const localVue = createLocalVue();
localVue.mixin(deviceStateMixin);

describe("TheHeader.test.js", () => {

    it("is created with default props", () => {
        const headerCmpWrapper = shallowMount(Header, {
            localVue,
            store
        });
        const vm = headerCmpWrapper.vm;

        expect(vm.containerWidth).toEqual(1200);
        expect(headerCmpWrapper.contains('header')).toBe(true);
        expect(headerCmpWrapper.find(UiRangeController).exists()).toBe(true);
    });

    it("is listen event from range-controller", () => {
        const mockHandler = jest.fn();
        const headerCmpWrapper = mount(Header, {
            localVue,
            store,
            methods: {
                onRangeChangeCompleted: mockHandler
            }
        });

        headerCmpWrapper.find(UiRangeController)
            .trigger("range-change-completed", {arg1: 1000, arg2: 2000});

        expect(mockHandler).toHaveBeenCalledWith(
            resumeConf.aggregate.defaultTermRange.min,
            resumeConf.aggregate.defaultTermRange.max,
        );
    });
});
