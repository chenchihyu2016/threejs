<script setup lang="ts">
    const { user } = storeToRefs(useGlobalStore());
</script>

<template>
    <div class="app-layout">
        <app-nav />

        <router-view v-slot="{ Component, route }">
            <transition name="fade" mode="out-in">
                <div :key="route.path" class="app-layout__content">
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
    </div>
</template>

<style scoped lang="scss">
    .app-layout {
        height: 100%;

        & > nav {
            border-bottom: $primary-color 1px solid;
            height: $navbar-height;
            width: 100%;
        }

        &__content {
            width: 100%;
            height: 100%;
        }
    }
</style>
