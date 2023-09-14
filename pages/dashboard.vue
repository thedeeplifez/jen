<template>
    <div>Dashboard</div>
</template>

<script setup>
// const { $fds, $toast } = useNuxtApp()
const { t } = useI18n()
const config = useRuntimeConfig();

useSeoMeta({
   title: `${t('dashboard')} - ${config.public.TITLE}`
})
</script>