<template>
    <div>Expenses</div>
</template>

<script setup>
// const { $fds, $toast } = useNuxtApp()
const { t } = useI18n()
const config = useRuntimeConfig();

useSeoMeta({
   title: `${t('expenses')} - ${config.public.TITLE}`
})

</script>