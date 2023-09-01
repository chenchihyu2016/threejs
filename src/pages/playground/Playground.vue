<script setup lang="ts">
    const blocks = ref([
        { id: 'first', text: 'first block' },
        { id: 'second', text: 'second block' },
        { id: 'third', text: 'third block' }
    ]);
</script>

<template>
    <div v-for="block in blocks" class="full-block" :id="block.id" ref="blocksRef">
        {{ block.text }}
    </div>
</template>

<style scoped lang="scss">
    .full-block {
        @include flex(center, center);
        width: 100%;
        height: 100%;
        border: 3px solid $primary-color;
        margin: auto;
        scroll-margin-top: $scroll-margin-top;

        @media screen and (max-width: $md) {
            width: 100%;
        }
    }
</style>
