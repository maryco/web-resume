// @see https://vue-test-utils.vuejs.org/ja/guides/testing-async-components.html
// import flushPromises from 'flush-promises';

describe.skip("Samples for implements test codes.", () => {
    test("Run Test (jest)", () => {
        expect("OK").toEqual("OK");
    });
    it("Run Test (same as test())", () => {
        expect("OK").toEqual("OK");
    });

    // test.only("Test only this. when 'test.only' has in the file", () => {
    //     expect("OK").toEqual("OK");
    // });

    test.skip("Skip Test", () => {
        expect("OK").toEqual("OK");
    });
    it.skip("Skip Test  (same as test.skip())", () => {
        expect("OK").toEqual("OK");
    });

    it("With option attachToDocument", () => {
        // const wrapper = mount(MyComponent, {
        //     //attachToDocument: true
        // });

        // If need to force call a watch,.. (ok?)
        //wrapper.vm.$options.watch.myWatchMethod.call(wrapper.vm);

        // Must destroy if 'attachToDocument = true'.
        // wrapper.destroy();
    });

    test.todo("Write a test later!");

    // let cmp;
    //
    // beforeEach(() => {
    //     cmp = shallowMount(SomeComponent, {
    //         // Be aware that props is overridden using `propsData`
    //         propsData: {
    //             propA: 100
    //         }
    //     });
    // });
});

/**
 * - Vue Test Utils
 * @see https://vue-test-utils.vuejs.org/ja/guides/
 *
 * - Jest
 * @see https://jestjs.io/docs/ja/getting-started
 * @see https://jestjs.io/docs/ja/api
 *
 * - Write the first Vue.js Component Unit Test in Jest
 * @see https://alexjover.com/blog/write-the-first-vue-js-component-unit-test-in-jest/
 *
 *  - Sample testing with d3
 *  @see https://medium.com/successivetech/unit-testing-react-d3-with-enzyme-and-jest-108735046535
 */