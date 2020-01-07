<template>
    <div id="app">
        <Header></Header>
        <div class="contents-container-wrap">
            <JobResumeChart></JobResumeChart>
        </div>
        <Footer></Footer>
        <Overlay></Overlay>
    </div>
</template>

<script>
    import Header from "./components/layout/TheHeader";
    import Footer from "./components/layout/TheFooter";
    import JobResumeChart from "./components/JobResumeChart";
    import Overlay from "./components/layout/TheOverlay";

    export default {
        name: 'app',
        components: {
            Overlay,
            JobResumeChart,
            Footer,
            Header,
        },
    }
</script>

<style lang="scss">
</style>
