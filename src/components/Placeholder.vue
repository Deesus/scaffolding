<template>
    <!-- TODO: Delete Placeholder Component: -->
    <div class="placeholder">
        <div>TODO: This is a placeholder; delete this component.</div>
        <div>{{ msg }}</div>
    </div>
</template>


<script>
    export default {
        name: 'Placeholder',

        props: {
            msg: {
                type: String
            }
        }
    }
</script>


<style scoped lang="scss">
    .placeholder {

    }
</style>
