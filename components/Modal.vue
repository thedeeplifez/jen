<template>
    <Teleport to="body">
        <div class="fmodal-overlay" :class="{show: show}">
            <div class="fmodal-wrapper"  @click="closeModal" ref="wrapper">
                <div class="fmodal-content bg-content relative p-4 sm:p-5 md:rounded-lg lg:rounded-xl w-full shadow-lg" :style="{maxWidth: `${maxWidth}px`}" >
                    <slot />

                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
    clickClose: Boolean,
    maxWidth: {
        type: Number,
        default: 500
    }
})

const emit = defineEmits(['close'])

const wrapper = ref()
const closeModal = (e) => {
    if (props.clickClose && e.target == wrapper.value) {
        emit('close')
    }
}

const detectClose = (e) => {
    if (e.key == 'Escape') {
        emit('close')
    }
}

const mainStore = useMainStore()
watch(() => props.show, (isShown) => {
    if (isShown) {
        document.addEventListener('keyup', detectClose)
        mainStore.noScrollCount++
    }
    else  {
        document.removeEventListener('keyup', detectClose)
        mainStore.noScrollCount--
    }
})

onBeforeUnmount(() => {
    if (props.show) {
        document.removeEventListener('keyup', detectClose)
        mainStore.noScrollCount--  
    }
})
</script>


<style scoped>
.fmodal-overlay {
    position: fixed;
    background-color: rgba(0,0,0,0.3);
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 1050;
    overflow: hidden;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
    backdrop-filter: blur(3px);
}

.fmodal-wrapper {
    position: relative;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
}

.fmodal-overlay.show {
    visibility: visible;
    opacity: 1;
}

.fmodal-content {
    overflow-y: auto;
    max-height: 100%;
    transition: all 0.1s;
    transform: translateY(70px);
}

.fmodal-overlay.show .fmodal-content {
    transform: translateY(0);

}
@media screen and (max-width: 767px) {
    .fmodal-wrapper {
        padding: 0;
        align-items: flex-end;
    }

    .fmodal-content {
        max-width: 100% !important;
        padding-bottom: 90px;
    }
}
</style>