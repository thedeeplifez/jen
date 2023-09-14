<template>
  <div>
    <!-- <VitePwaManifest /> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
/* onBeforeMount(() => {
  // theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}) */

const mainStore = useMainStore()
const scrollClass = computed(() => {
	return mainStore.noScrollCount > 0 ? 'no-scroll' : ''
})
useHead({
	bodyAttrs: {
		class: [scrollClass]
	}
})
</script>