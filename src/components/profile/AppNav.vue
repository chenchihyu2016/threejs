<script setup lang="ts">
    import { ref } from 'vue';

    const links = ref([{ name: 'Profile' }, { name: 'Playground' }]);
    const state = ref(true);
    const toggleState = () => (state.value = !state.value);
    const scrollTop = ref(0);

    useEventListener('scroll', (e) => (scrollTop.value = (e.target as HTMLElement).scrollTop), true);
</script>

<template>
    <nav>
        <transition name="fade" mode="out-in">
            <div v-if="scrollTop > 0" class="border-line" />
        </transition>
        <span :class="['material-icons', , state && 'flip']" @pointerdown="toggleState">density_medium</span>

        <div class="nav-right">
            <router-link v-for="link in links" :to="{ name: link.name }">{{ link.name }}</router-link>
            <br />
        </div>
    </nav>
</template>

<style scoped lang="scss">
    nav {
        @include flex(space-between, center);
        padding: 0 2rem;
        position: fixed;
        background: $background-color;
        z-index: 1;
        user-select: none;
        height: $navbar-height;
        width: 100%;

        & > .border-line {
            position: absolute;
            border: 1px solid $primary-color;
            bottom: 0;
            left: 0;
            right: 0;
        }

        & > span {
            cursor: pointer;
            transition: $animation-duration transform ease;

            &.flip {
                transform: rotateY(180deg);
            }
        }

        & > .nav-right {
            @include flex(space-between, center);

            a {
                margin-left: 1rem;
                font-size: 1.2rem;

                &:hover {
                    color: $primary-color;
                }

                &.router-link-exact-active {
                    color: $primary-color;
                    text-decoration: underline;
                }
            }
        }
    }
</style>
