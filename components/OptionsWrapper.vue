<template>
    <Teleport to="body">
        <div :class="isMobile ? 'o-select-backdrop' : 'o-select-dropdown'" v-if="open" ref="optionsWrapper">
            <div class="o-select-content" ref="content" :class="wrapperClass">
                <slot></slot>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    open: Boolean,
    width: Number,
    el: [HTMLElement, undefined],
    wrapperClass: String
})
const isMobile = ref(false)
const mainStore = useMainStore()
watch(() => props.open, (isOpened) => {
    if (isOpened) {
        isMobile.value = window.innerWidth < 768
        document.addEventListener('click', closeCheck)
        window.addEventListener('resize', reizeHandler)
        nextTick(() => {
            if (window.innerWidth >= 768) {
                posDropdown()
                posDropdown()
            }
            if (optionsWrapper.value.classList.contains('o-select-backdrop')) {
                mainStore.noScrollCount++
            }
        })
    }
    else { // when dropdown is closed
        document.removeEventListener('click', closeCheck)
        window.removeEventListener('resize', reizeHandler)
        if (optionsWrapper.value.classList.contains('o-select-backdrop')) {
            mainStore.noScrollCount--
        }
    }
})


const content = ref(null)
const emit = defineEmits(['close'])
const closeCheck = (e) => {
    if (!props.open || !props.el) return
    if (!props.el.contains(e.target) && !content.value.contains(e.target)) {
        emit('close')
    }
}
const reizeHandler = () => {
    posDropdown()
}
const optionsWrapper = ref(null)
const posDropdown = () => {
    if (isMobile.value || !optionsWrapper.value) return
    const selectRect = props.el.getBoundingClientRect()
    const optionsRect = optionsWrapper.value.getBoundingClientRect()
    const optionsWidth = props.width || selectRect.width
    const newStyle = {
        position: 'absolute',
        width: `${optionsWidth}px`
    }

    if (selectRect.x + optionsWidth < document.body.scrollWidth) { // have space on right
        newStyle.left = `${selectRect.left}px`
    } else {
        newStyle.right = `${document.body.scrollWidth - selectRect.right}px`
    }

    if (selectRect.bottom + optionsRect.height < window.innerHeight || selectRect.y - optionsRect.height < 0) { // have space on bottom
        newStyle.top = `${selectRect.bottom + window.scrollY}px`
    } else {
        newStyle.bottom = `${window.innerHeight - selectRect.y - window.scrollY}px`
    }

    /* if (props.minWidth) {
        optionsWrapper.value.style.minWidth = `${props.minWidth}px`
    } */

    Object.assign(optionsWrapper.value.style, newStyle)
}

onBeforeUnmount(() => {
    document.removeEventListener('click', closeCheck)
    window.removeEventListener('resize', reizeHandler)
})
</script>

<style scoped>

.o-select-backdrop {
    position: fixed;
    z-index: 1050;
    animation: fadeIn 0.1s;
    background-color: #00000088;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
}

.o-select-content {
    background-color: var(--o-dropdown-bg);
    box-shadow: var(--o-dropdown-shadow);
    transition: all 0.1s;
    max-height: 50vh;
    display: flex;
    flex-direction: column;
    overflow: auto;
    border-radius: var(--o-border-radius);
}

.o-select-dropdown {
    background-color: var(--o-dropdown-bg);
    box-shadow: var(--o-dropdown-shadow);
    border-radius: var(--o-border-radius);
    z-index: 1050;
    max-height: 50vh;
    overflow: hidden;
    /* animation: fadeIn 0.1s; */
}

.o-select-backdrop .o-select-content {
    min-height: 60vh;
}
@media (max-width: 767px) {
    .o-select-content {
        max-height: 100vh;
        border-radius: 0;
        padding-bottom: 90px; /* offset url bar in ios */
        animation: slideUp 0.3s
    }
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes slideUp {
    0% {
        transform: translateY(60px);
    }
    100% {
        transform: translateY(0);
    }
}
</style>