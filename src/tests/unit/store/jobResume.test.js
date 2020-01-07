import jobResume from "@/store/modules/jobResume";
import {JobResumeException} from "@/core/exceptions/jobResumeException";
import {JobResumeConfig as resumeConf} from "@/config/JobResumeChart.config";

describe("jobResume.test.js MUTATIONS", () => {
   it("setTerm success (mutations methods has not type safe implements)", () => {
       const toBeState = {
           termStartFrom: 1989,
           termStartTo: 2005,
           defaultStartFrom: null,
           defaultStartTo: null,
           termRangeMin: null,
           termRangeMax: null,
       };
       const state = {
           termStartFrom: null,
           termStartTo: null,
           defaultStartFrom: null,
           defaultStartTo: null,
           termRangeMin: null,
           termRangeMax: null,
       };

       jobResume.mutations.setTerm(state, {from: 1989, to: 2005});
       expect(state).toEqual(toBeState);

       jobResume.mutations.setTerm(state, {from: "1989", to: "2005"});
       expect(state).not.toEqual(toBeState);
   });

    it("setDefaultTerm success (mutations methods has not validate passed values)", () => {
        const toBeState = {
            termStartFrom: null,
            termStartTo: null,
            defaultStartFrom: "1",
            defaultStartTo: "0",
            termRangeMin: null,
            termRangeMax: null,
        };
        const state = {
            termStartFrom: null,
            termStartTo: null,
            defaultStartFrom: null,
            defaultStartTo: null,
            termRangeMin: null,
            termRangeMax: null,
        };

        jobResume.mutations.setDefaultTerm(state, {from: "1", to: "0"});
        expect(state).toEqual(toBeState);
    });

    it("setTermRange success", () => {
        const toBeState = {
            termStartFrom: null,
            termStartTo: null,
            defaultStartFrom: null,
            defaultStartTo: null,
            termRangeMin: new Date("2014-01-02"),
            termRangeMax: new Date("2015-10-20"),
        };
        const state = {
            termStartFrom: null,
            termStartTo: null,
            defaultStartFrom: null,
            defaultStartTo: null,
            termRangeMin: new Date("2014-01-02"),
            termRangeMax: new Date("2015-10-20"),
        };

        jobResume.mutations.setTermRange(state, {min: "2014-01-02", max: "2015-10-20"});
        expect(state).toEqual(toBeState);
    });
});

describe("jobResume.test.js ACTIONS", () => {
    it("changeTermAction success", () => {
        const commit = jest.fn();

        jobResume.actions.changeTermAction({ commit }, {from: 1989, to: 2005});
        expect(commit).toHaveBeenCalledWith("setTerm", {from: 1989, to: 2005});
    });

    it("fails changeTermAction by validation", () => {
        const commit = jest.fn();
        const actionTests = {
            invalidFrom: {
                message: "Invalid parameter (from:1 to:2001)",
                call: () => {jobResume.actions.changeTermAction({ commit }, {from: 1, to: 2001});}
            },
            invalidTo: {
                message: "Invalid parameter (from:1000 to:0001)",
                call: () => {jobResume.actions.changeTermAction({ commit }, {from: 1000, to: "0001"});}
            },
            fromGreaterThanTo: {
                message: '"to" must greater than "from" (from:2000 to:1000)',
                call: () => {jobResume.actions.changeTermAction({ commit }, {from: 2000, to: 1000});}
            },
        };

        expect(actionTests.invalidFrom.call)
            .toThrowError(new JobResumeException(actionTests.invalidFrom.message));

        expect(actionTests.invalidTo.call)
            .toThrowError(new JobResumeException(actionTests.invalidTo.message));

        expect(actionTests.fromGreaterThanTo.call)
            .toThrowError(new JobResumeException(actionTests.fromGreaterThanTo.message));
    });

    it("changeDefaultTermAction success", () => {
        const commit = jest.fn();

        jobResume.actions.changeDefaultTermAction({ commit }, {from: 5000, to: 5001});
        expect(commit).toHaveBeenCalledWith("setDefaultTerm", {from: 5000, to: 5001});
    });

    it("fails changeDefaultTermAction by validation", () => {
        const commit = jest.fn();
        const actionTests = {
            invalidFrom: {
                message: "Invalid parameter (from:1 to:2001)",
                call: () => {jobResume.actions.changeDefaultTermAction({ commit }, {from: 1, to: 2001});}
            },
            invalidTo: {
                message: "Invalid parameter (from:1000 to:0001)",
                call: () => {jobResume.actions.changeDefaultTermAction({ commit }, {from: 1000, to: "0001"});}
            },
            fromGreaterThanTo: {
                message: '"to" must greater than "from" (from:2000 to:1000)',
                call: () => {jobResume.actions.changeDefaultTermAction({ commit }, {from: 2000, to: 1000});}
            },
        };

        expect(actionTests.invalidFrom.call)
            .toThrowError(new JobResumeException(actionTests.invalidFrom.message));

        expect(actionTests.invalidTo.call)
            .toThrowError(new JobResumeException(actionTests.invalidTo.message));

        expect(actionTests.fromGreaterThanTo.call)
            .toThrowError(new JobResumeException(actionTests.fromGreaterThanTo.message));
    });

    it("changeTermRangeAction success", () => {
        const commit = jest.fn();

        jobResume.actions.changeTermRangeAction({ commit }, {min: "1970-01-01", max: "2999-12-31"});
        expect(commit).toHaveBeenCalledWith("setTermRange", {min: "1970-01-01", max: "2999-12-31"});
    });

    it("fails changeTermRangeAction by validation", () => {
        const commit = jest.fn();
        const actionTests = {
            invalidMin: {
                message: "Invalid date format. (min:2019-01 max:2019-01-01)",
                call: () => {jobResume.actions.changeTermRangeAction({ commit }, {min: "2019-01", max: "2019-01-01"});}
            },
            invalidMax: {
                message: "Invalid date format. (min:1970-01-01 max:2019/11/12)",
                call: () => {jobResume.actions.changeTermRangeAction({ commit }, {min: "1970-01-01", max: "2019/11/12"});}
            },
        };

        expect(actionTests.invalidMin.call)
            .toThrowError(new JobResumeException(actionTests.invalidMin.message));

        expect(actionTests.invalidMax.call)
            .toThrowError(new JobResumeException(actionTests.invalidMax.message));
    });
});

describe("jobResume.test.js GETTERS", () => {
    const testState = {
        termStartFrom: 1995,
        termStartTo: 2015,
        defaultStartFrom: null,
        defaultStartTo: null,
        termRangeMin: new Date("1970-02-03"),
        termRangeMax: new Date("2003-11-30"),
    };

    const testStateEmpty = {
        termStartFrom: null,
        termStartTo: null,
        defaultStartFrom: null,
        defaultStartTo: null,
        termRangeMin: null,
        termRangeMax: null,
    };

    it("termStartFromDate returns Date", () => {
        const actual = jobResume.getters.termStartFromDate(testState);

        expect(actual).toBeInstanceOf(Date);
        expect(actual.toString())
            .toEqual(new Date(`${testState.termStartFrom}-01-01`).toString());
    });

    it("termStartFromDate returns null", () => {
        const actual = jobResume.getters.termStartFromDate(testStateEmpty);
        expect(actual).toEqual(null);
    });

    it("termStartToDate returns Date", () => {
        const actual = jobResume.getters.termStartToDate(testState);

        expect(actual).toBeInstanceOf(Date);
        expect(actual.toString())
            .toEqual(new Date(`${testState.termStartTo}-12-31`).toString());
    });

    it("termStartToDate returns null", () => {
        const actual = jobResume.getters.termStartToDate(testStateEmpty);
        expect(actual).toEqual(null);
    });

    it("termRangeMinYear returns year", () => {
        const actual = jobResume.getters.termRangeMinYear(testState);
        expect(actual).toEqual(testState.termRangeMin.getFullYear());
    });

    it("termRangeMinYear returns config value", () => {
        const actual = jobResume.getters.termRangeMinYear(testStateEmpty);
        expect(actual).toEqual(resumeConf.aggregate.defaultTermRange.min);
    });

    it("termRangeMaxYear returns year", () => {
        const actual = jobResume.getters.termRangeMaxYear(testState);
        expect(actual).toEqual(testState.termRangeMax.getFullYear());
    });

    it("termRangeMaxYear returns config value", () => {
        const actual = jobResume.getters.termRangeMaxYear(testStateEmpty);
        expect(actual).toEqual(resumeConf.aggregate.defaultTermRange.max);
    });

});
