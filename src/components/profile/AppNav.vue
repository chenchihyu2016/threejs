<script setup lang="ts">
    import { ref } from 'vue';

    const links = ref([{ name: 'Profile' }, { name: 'Playground' }]);
</script>

<template>
    <nav v-once>
        <img class="nav-left" src="" title="profile" />
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
