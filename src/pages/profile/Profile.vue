<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    const blocks = ref([
        { id: 'first', text: 'first block' },
        { id: 'second', text: 'second block' },
        { id: 'third', text: 'third block' }
    ]);
    const currentBlockId = ref<string | null>(blocks.value[0].id);
    const blocksRef = ref<Array<HTMLDivElement>>([]);

    onMounted(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    currentBlockId.value = entry.target.getAttribute('id');
                });
            },
            { threshold: 0.75 }
        );

        [...blocksRef.value].reverse().forEach((blockRef) => {
            observer.observe(blockRef);
        });
    });
</script>

<template>
    <app-sidebar :currentBlockId="currentBlockId" :blocks="blocks" />
    <div v-for="block in blocks" class="full-block" :id="block.id" ref="blocksRef">
        {{ block.text }}
    </div>
</template>

<style scoped lang="scss">
    .full-block {
        @include flex(center, center);
        width: $md;
        height: 100%;
        border: 3px solid $primary-color;
        margin: auto;
        scroll-margin-top: $scroll-margin-top;

        @media screen and (max-width: $md) {
            width: 100%;
        }
    }
</style>
