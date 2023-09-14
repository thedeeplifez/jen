<template>
    <div>
        <div class="flex items-end justify-between md:hidden" @click="expand = !expand">
            <div :class="labelClass">{{ label }}</div>
            <button class="inline-flex text-primary items-center pb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
        </div>
       <div class="collapse-container" :class="{expand: expand}">
            <div class="min-h-0">
                <slot></slot>
            </div>
       </div>
    </div>
</template>

<script setup>
const props = defineProps({
    label: String,
    labelClass: String
})
const expand = ref(false)
</script>

<style scoped>
.collapse-container {
    display: grid;
    grid-template-rows: 0fr;
    overflow: hidden;
    transition: grid-template-rows 0.3s;
    min-height: 0;
}

@media screen and (min-width:768px) {
    .collapse-container {
        grid-template-rows: 1fr;
    }
}
.collapse-container.expand {
    grid-template-rows: 1fr;
}
</style>