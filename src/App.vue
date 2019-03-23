<template>
    <div id="app">
        <img src="./assets/img/placeholder_church.png" alt="church">
        <v-placeholder />
    </div>
</template>


<script>
    import VPlaceholder from './components/Placeholder.vue';

    export default {
        name: 'app',

        components: {
            VPlaceholder
        }
    }
</script>
