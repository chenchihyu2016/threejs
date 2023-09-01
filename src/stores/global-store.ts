export const useGlobalStore = defineStore('global', () => {
    const user = ref(useSessionStorage('user', { theme: 'dark' }));

    return { user };
});
