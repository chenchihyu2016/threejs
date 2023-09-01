<script setup lang="ts">
    interface IAppSidebarProps {
        currentBlockId: string;
        blocks: Array<{ id: string; text: string }>;
    }

    defineProps<IAppSidebarProps>();
</script>

<template>
    <aside>
        <ul>
            <li v-for="block in blocks" :class="[block.id === currentBlockId && 'active']">
                <span> || </span>
                <a :href="`#${block.id}`">{{ block.text }}</a>
            </li>
        </ul>
    </aside>
</template>

<style scoped lang="scss">
    aside {
        position: fixed;
        top: $navbar-height;
        left: calc(50% + (1 / 2) * $md);
        padding: 1rem 1rem;
        z-index: 1;

        & > ul {
            @include flex(center, flex-start);
            flex-direction: column;

            & > li {
                @include flex(center, center);
                margin-bottom: 1rem;
                list-style-type: '';

                &:hover {
                    & > a {
                        color: $primary-color;
                    }
                }

                &.active {
                    color: $primary-color;
                }

                & > a {
                    font-size: 1.5rem;
                    padding: 0 1rem;
                    color: inherit;
                }
            }
        }
    }
</style>
