import {JobResumeConfig as resumeConf} from "../../config/JobResumeChart.config";
import {JobResumeException} from "../../core/exceptions/jobResumeException";
import {stringUtilMixin} from "../../core/mixins/stringUtilMixin";

const state = {
    /**
     * Current range of years.
     * Note: Range is project start dates range
     * @typedef {String} The year format (yyyy)
     */
    termStartFrom: null,
    termStartTo: null,

    /**
     * Range of years for the initial display
     * @typedef {String} The year format (yyyy)
     */
    defaultStartFrom: null,
    defaultStartTo: null,

    /**
     * @type:Date
     */
    termRangeMin: null,
    termRangeMax: null,
};

const getters = {
    termStartFromDate(state) {
        return state.termStartFrom !== null
            ? new Date(`${state.termStartFrom}-01-01`)
            : null;
    },

    termStartToDate(state) {
        return state.termStartTo !== null
            ? new Date(`${state.termStartTo}-12-31`)
            : null;
    },

    termRangeMinYear(state) {
        return state.termRangeMin instanceof Date
            ? state.termRangeMin.getFullYear()
            : resumeConf.aggregate.defaultTermRange.min
    },

    termRangeMaxYear(state) {
        return state.termRangeMax instanceof Date
            ? state.termRangeMax.getFullYear()
            : resumeConf.aggregate.defaultTermRange.max
    }
};

const actions = {
    /**
     *
     * @param commit
     * @param {number|string} from 4 length numeric
     * @param {number|string} to 4 length numeric
     */
    changeTermAction: ({commit}, {from, to}) => {
        if ($_jobResume_methods.validateYearTerm(from, to)) {
            commit('setTerm', {from: from, to: to})
        }
    },

    /**
     *
     * @param commit
     * @param {number|string} from 4 length numeric
     * @param {number|string} to 4 length numeric
     */
    changeDefaultTermAction: ({commit}, {from, to}) => {
        if ($_jobResume_methods.validateYearTerm(from, to)) {
            commit('setDefaultTerm', {from: from, to: to})
        }
    },

    /**
     *
     * @param commit
     * @param {String} min Date format string yyyy-mm-dd
     * @param {String}  max Date format string yyyy-mm-dd
     */
    changeTermRangeAction: ({commit}, {min, max}) => {
        if (!stringUtilMixin.methods.isProbablyDateFormat(min)
            || !stringUtilMixin.methods.isProbablyDateFormat(max)) {
            throw new JobResumeException(`Invalid date format. (min:${min} max:${max})`);
        }
        commit('setTermRange', {min: min, max: max});
    },
};

const mutations = {
    setTerm(state, {from, to}) {
        state.termStartFrom = from;
        state.termStartTo = to;
    },

    setDefaultTerm(state, {from, to}) {
        state.defaultStartFrom = from;
        state.defaultStartTo = to;
    },

    /**
     * Note: Must pass the correctly format string (yyyy-mm-dd)
     * @param state
     * @param min
     * @param max
     */
    setTermRange(state, {min, max}) {
        state.termRangeMin = new Date(min);
        state.termRangeMax = new Date(max);
    },
};

const $_jobResume_methods = {
    validateYearTerm: function (from, to) {
        if (!/[0-9]{4}/.test(parseInt(from)) || !/[0-9]{4}/.test(parseInt(to))) {
            throw new JobResumeException(`Invalid parameter (from:${from} to:${to})`);
        }

        if (parseInt(from) > parseInt(to)) {
            throw new JobResumeException(`"to" must greater than "from" (from:${from} to:${to})`);
        }

        return true;
    }
};

export default {
    namespaced: false,
    state,
    getters,
    mutations,
    actions,
}