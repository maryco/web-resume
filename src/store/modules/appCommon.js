const state = {
    /**
     * @typedef {boolean}
     */
    isOverlayActivated: false,
};

const getters = {};

const mutations = {
    setOverlayState: (state, val) => {
        state.isOverlayActivated = val;
    }
};

const actions = {
    /**
     *
     * @param commit
     * @param {boolean} val
     */
    switchOverlayAction: ({ commit }, val) => {
        commit('setOverlayState', val);
    },

    activateOverlayAction: ({ commit }) => {
        commit('setOverlayState', true);
    },

    teardownOverlayAction: ({ commit }) => {
        commit('setOverlayState', false);
    },
};

export default {
    namespaced: false,
    state,
    getters,
    mutations,
    actions,
}