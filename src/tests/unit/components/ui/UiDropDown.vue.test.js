import "@/tests/matchMedia.mock";
import {createLocalVue, mount, shallowMount} from "@vue/test-utils";
import flushPromises from 'flush-promises';

import UiDropDown from "@/components/ui/UiDropDown";

// Mocking lodash module 'the no wait throttle'.
import "lodash";

jest.mock("lodash", () => {
    const origin = jest.requireActual("lodash");
    return {
        ...origin,
        throttle: jest.fn((fn) => {
            return fn && fn;
        }),
    }
});

import store from "@/store";
import {deviceStateMixin} from "@/core/mixins/deviceStateMixin";

const localVue = createLocalVue();
localVue.mixin(deviceStateMixin);

const factoryWithProps = (props = {}, isShallow = true) => {
    return (isShallow)
        ? shallowMount(UiDropDown, {propsData: {...props}, store, localVue})
        : mount(UiDropDown, {propsData: {...props}, store, localVue,})
};

const forceMobileWrapper = (props = {}) => {
    // override 'deviceStateMixin.isMobileScreen()',
    // cuz 'dropdown' mode is only for the mobile screen.
    // Note: override must at the mount.
    const alwaysMobileScreen = jest.fn(() => {
        return true
    });

    return mount(UiDropDown, {
        localVue,
        store,
        propsData: {...props},
        methods: {
            isMobileScreen: alwaysMobileScreen
        }
    });
};

describe("UiDropDown.vue.test.js", () => {

    beforeEach(() => {
    });

    it("initialize with default props", () => {
        const wrapper = factoryWithProps({}, false);
        const vm = wrapper.vm;

        expect(wrapper.is(UiDropDown)).toBe(true);
        expect(vm.items.length).toBe(0);

    });

    it("render with default props", () => {
        const wrapper = factoryWithProps({}, false);

        // render "list" appearance.
        expect(wrapper.contains(".contents-nav")).toBe(true);
        expect(wrapper.contains(".nav-item")).toBe(false);
        expect(wrapper.contains(".dropdown-controller")).toBe(false);
    });

    it("render 'dropdown' appearance", async () => {
        const wrapper = forceMobileWrapper();

        expect(wrapper.contains(".contents-nav")).toBe(true);
        expect(wrapper.contains(".nav-item")).toBe(false);
        expect(wrapper.contains(".dropdown-controller")).toBe(false);

        await flushPromises();
        expect(wrapper.contains(".dropdown-controller")).toBe(true);
        expect(wrapper.contains(".contents-nav-toggler")).toBe(true);
    });

    // Note: Example implementation of the using '$nextTick'
    // @see https://vue-test-utils.vuejs.org/ja/guides/testing-async-components.html
    // it("render 'dropdown' appearance", () => {return new Promise(doneAll => {
    //     // override 'deviceStateMixin.isMobileScreen()',
    //     // cuz 'dropdown' mode is only for the mobile screen.
    //     // Note: override must at the mount.
    //     const alwaysMobileScreen = jest.fn(() => {return true});
    //
    //     const wrapper = mount(UiDropDown, {
    //         propsData: {}, store, localVue,
    //         methods: {
    //             isMobileScreen: alwaysMobileScreen
    //         }
    //     });
    //
    //     expect(wrapper.contains(".contents-nav")).toBe(true);
    //     expect(wrapper.contains(".nav-item")).toBe(false);
    //     expect(wrapper.contains(".dropdown-controller")).toBe(false);
    //
    //     wrapper.vm.$nextTick()
    //         .then(() => {
    //             expect(wrapper.contains(".dropdown-controller")).toBe(true);
    //             expect(wrapper.contains(".contents-nav-toggler")).toBe(true);
    //         })
    //         .catch(e => {console.log(e);})
    //         .finally(() => {doneAll();});
    // })});

    it("show dropdown items by click toggle button", async () => {
        const testItems = [
            {label: "item-label-001", value: "item-001"},
            {label: "item-label-002", value: "item-002"},
            {label: "item-label-003", value: "item-003"},
        ];
        const wrapper = forceMobileWrapper({items: testItems});

        // Closed
        expect(wrapper.vm.isOpen).toEqual(false);
        expect(wrapper.vm.activeItems.length).toBe(1);

        // flushes all pending resolved promise handlers,
        // for reflect click result to DOM.
        await flushPromises();

        // Open
        wrapper.find(".contents-nav-toggler").trigger("click");
        expect(wrapper.vm.isOpen).toEqual(true);
        expect(wrapper.vm.activeItems.length).toBe(testItems.length);

        await flushPromises();
        expect(wrapper.findAll(".nav-item").length).toBe(testItems.length);

        // Close
        wrapper.find(".contents-nav-toggler").trigger("click");
        expect(wrapper.vm.isOpen).toEqual(false);
        expect(wrapper.vm.activeItems.length).toBe(1);

        await flushPromises();
        expect(wrapper.findAll(".nav-item").length).toBe(1);

        // Note If implements by nextTick and async combination (but lower readability :->)
        // wrapper.vm.$nextTick()
        //     .then(async () => {
        //         // Open
        //         wrapper.find(".contents-nav-toggler").trigger("click");
        //         expect(wrapper.vm.isOpen).toEqual(true);
        //         expect(wrapper.vm.activeItems.length).toBe(testItems.length);
        //
        //         // flushes all pending resolved promise handlers,
        //         // for reflect click result to DOM.
        //         await flushPromises();
        //         expect(wrapper.findAll(".nav-item").length).toBe(testItems.length);
        //
        //         // Close
        //         wrapper.find(".contents-nav-toggler").trigger("click");
        //         expect(wrapper.vm.isOpen).toEqual(false);
        //         expect(wrapper.vm.activeItems.length).toBe(1);
        //
        //         await flushPromises();
        //         expect(wrapper.findAll(".nav-item").length).toBe(1);
        //     })
        //     .catch(e => {console.log(e);})
        //     .finally(() => {doneAll();});
    });

    it("change selectedValue by click item", async () => {
        const testItems = [
            {label: "item-label-001", value: "item-001"},
            {label: "item-label-002", value: "item-002"},
            {label: "item-label-003", value: "item-003"},
        ];
        const wrapper = forceMobileWrapper({items: testItems});

        const listSecond = wrapper.findAll('.nav-item > a')
            .at(0)
            .trigger('click');
        expect(wrapper.vm.selectedValue).toEqual("item-001");

        await flushPromises();
        expect(wrapper.find('.nav-item__selected').text()).toBe('item-label-001');
    });

    it("emit selected event by click item", async () => {
        const testItems = [
            {label: "item-label-001", value: "item-001"},
            {label: "item-label-002", value: "item-002"},
            {label: "item-label-003", value: "item-003"},
        ];
        const wrapper = forceMobileWrapper({items: testItems});

        wrapper.findAll('.nav-item > a')
            .at(1)
            .trigger('click');

        expect(wrapper.vm.selectedValue).toEqual("item-002");

        await flushPromises();

        const eventNm = wrapper.vm.SelectedEvent;
        expect(wrapper.emitted()[eventNm]).toBeTruthy();
    });

    it("emit selected event by click same item", async () => {
        const testItems = [
            {label: "item-label-001", value: "item-001"},
            {label: "item-label-002", value: "item-002"},
            {label: "item-label-003", value: "item-003"},
        ];
        const wrapper = forceMobileWrapper({items: testItems});

        const listItem = wrapper.findAll('.nav-item > a').at(2);
        listItem.trigger('click');
        expect(wrapper.vm.selectedValue).toEqual("item-003");

        await flushPromises();

        const eventNm = wrapper.vm.SelectedEvent;
        expect(wrapper.emitted()[eventNm].length).toBe(1);

        const emitted = wrapper.emitted()[eventNm][0];
        // Note: If pass emitted[0] to the expect directly, occurs a below error.
        // "Matcher error: received value must be a string"
        expect(`${emitted[0]}`).toMatch(/^[0-9]+$/);
        expect(emitted[1]).toBe('item-003');

        listItem.trigger('click');
        expect(wrapper.emitted()[eventNm].length).toBe(2);
    });

    it("not emit selected event by click same item", async () => {
        const testItems = [
            {label: "item-label-001", value: "item-001"},
            {label: "item-label-002", value: "item-002"},
            {label: "item-label-003", value: "item-003"},
        ];
        const wrapper = forceMobileWrapper({items: testItems, ignoreSameSelect: true});

        const listItem = wrapper.findAll('.nav-item > a').at(2);
        listItem.trigger('click');
        expect(wrapper.vm.selectedValue).toEqual("item-003");

        await flushPromises();

        const eventNm = wrapper.vm.SelectedEvent;
        expect(wrapper.emitted()[eventNm].length).toBe(1);

        listItem.trigger('click');
        expect(wrapper.emitted()[eventNm].length).toBe(1);
    });
});