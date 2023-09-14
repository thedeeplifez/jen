<template>
  <!-- <div class="relative"> -->
        <button class="hover:text-[color:var(--primary)] transition-all" @click="switchLang">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z"/>
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z"/>
            </svg>
        </button>
<!--         <div class="lang-options shadow rounded-lg" :class="{show: showSwitcher}">
            sdsd
        </div> -->
    <!-- </div> -->
</template>

<script setup>
const { locale/* , locales */, setLocale } = useI18n()

/* const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
}) */

const langCodes = ['en-us', 'zh-cn', 'zh-tw']
const switchLang = () => {
    const currentLangIndex = langCodes.findIndex(l => l == locale.value)
    const nextLangIndex = currentLangIndex == langCodes.length - 1 ? 0 : currentLangIndex + 1
    setLocale(langCodes[nextLangIndex])
}
/* const showSwitcher = ref(false)
const openSwitcher = () => {
    showSwitcher.value = true
}

const checkClose = () => {
    if (showSwitcher.value) {
        showSwitcher.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', checkClose)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', checkClose)
}) */
</script>

<style>
/* .lang-options {
    position: absolute;
    bottom: 100%;
    left: 0;
    transform: translateY(50px);
    transition: all 0.2s;
    opacity: 0;
    visibility: hidden;
    z-index: 5;
}

.lang-options.show {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
} */
</style>