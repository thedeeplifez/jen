<template>
    <NuxtLink :to="to" class="p-3 flex relative side-bar-item" :class="open ? 'pl-4' :''">
        <div class="z-10 transition duration-300 w-full">
            <div class="flex items-center" :class="open ? '' : 'justify-center'">
                <slot />
            </div>
        </div>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true
    }
})

const open = inject('open')
</script>

<style scoped>
.side-bar-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 6px;
    height: 100%;
    transition: all 0.3s;
    transform: scaleX(0);
    background: var(--primary);
    transform-origin: left;
    z-index: 1;
    color: var(--text-light);
  
}
.side-bar-item {
    color: var(--text)
}

.side-bar-item:hover, .router-link-active.side-bar-item {
    color: var(--primary);
}


.router-link-active.side-bar-item {
    /* color: #fff; */
}

.router-link-active.side-bar-item::before {
    transform: scaleX(1);
}
</style>