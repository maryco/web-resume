<template>
    <transition name="fade">
    <div v-if="isActive"
         class="overlay-container"
         @click.prevent.stop="forceTeardown"></div>
    </transition>
</template>

<script>
    import { mapActions, mapState } from "vuex";

    export default {
        name: "Overlay",

        mounted() {
        },

        computed: {
            ...mapState({
                isActive: state => state.appCommon.isOverlayActivated,
            }),
        },

        watch: {
            isActive: function (newVal, oldVal) {
                // if (newVal === true && oldVal === false) {
                //     console.log(`Bring up !`);
                // }
                // if (newVal === false && oldVal === true) {
                //     console.log(`Tear down !`);
                // }
            },
        },

        methods: {
            ...mapActions([
                'switchOverlayAction',
            ]),

            forceTeardown() {
                this.switchOverlayAction(false);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s ease-out;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>