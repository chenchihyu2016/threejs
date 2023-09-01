<script setup lang="ts"></script>

<template>
    <main>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </main>
</template>

<style scoped lang="scss">
    @import '@/scss/main.scss';

    main {
        width: 100dvw;
        height: 100dvh;
        background: $background-color;
        color: $text-color;
        overflow: auto;
        scroll-behavior: smooth;

        &::-webkit-scrollbar {
            display: none;
        }
    }
</style>
