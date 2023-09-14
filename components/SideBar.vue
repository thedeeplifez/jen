<template>
    <div class="bg-content shrink-0 shadow w-full transition-all duration-300 hidden md:flex md:flex-col justify-between" :style="sideBarStyle">
        <div class="flex flex-col h-screen sticky top-0">
            <div class="flex flex-col grow">
                <div class="px-4 pb-4 pt-8 flex shrink-0" :class="open ? 'justify-start' : 'justify-center'">
                    <button class="cursor-pointer text-2xl leading-none flex items-center" @click="trigger">
                        <svg class="transition-all duration-300 side-bar-arrow" :class="{'rotate-180' : open}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </button>
                    <div :class="{hidden: !open}" class="text-lg ml-4 flex items-center">
                        <img src="/android-icon-72x72.png" style="height:22px;"><span class="font-semibold ml-4">{{$t('expense_tracker')}}</span>
                        <!-- <img src="~/assets/img/momentico-long.png" :class="open? 'block' : 'hidden'" style="height: 22px;"> -->
                    </div>
                    <div :class="{hidden: !open}"></div>
                </div>
                <div class="overflow-auto grow mt-2">
                    <SideBarItem :to="localePath('/dashboard')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z"/>
                        </svg>
                        <span class="ml-3" :class="{hidden: !open}">{{ $t('dashboard') }}</span>
                    </SideBarItem>
                    <SideBarItem :to="localePath('/expenses')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 3a2 2 0 0 1 2-2h13.5a.5.5 0 0 1 0 1H15v2a1 1 0 0 1 1 1v8.5a1.5 1.5 0 0 1-1.5 1.5h-12A2.5 2.5 0 0 1 0 12.5V3zm1 1.732V12.5A1.5 1.5 0 0 0 2.5 14h12a.5.5 0 0 0 .5-.5V5H2a1.99 1.99 0 0 1-1-.268zM1 3a1 1 0 0 0 1 1h12V2H2a1 1 0 0 0-1 1z"/>
                        </svg>
                        <span class="ml-3" :class="{hidden: !open}">{{ $t('expenses') }}</span>
                    </SideBarItem>
                </div>
            </div>
            <div class="shrink-0">
                <div class="flex" :class="open ?'px-6' : 'flex-col items-center'">
                    <div :class="open ? 'mr-6' : 'mb-4'">
                        <LangSwitcher />
                    </div>
                    <div>
                        <ThemeSwitcher />
                    </div>
                </div>
              <!--   <div class="flex items-center py-3 px-4 w-full cursor-pointer transition-all duration-300 hover:text-[color:var(--primary)] justify-end" :class="open ? '' : 'justify-center'" @click="mainStore.logoutModal = true">
                    <span class="mr-3" :class="{hidden: !open}">{{ $t('log_out') }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                </div> -->
                <div class="py-3"></div>
            </div>

        </div>
    </div>
</template>

<script setup>
// const mainStore = useMainStore()

const open = ref(true)
provide('open', open)
const sideBarStyle = computed(() => {
    return {
        maxWidth: open.value ? '280px' : '60px'
    }
})

const manualClose = ref(false) // set to true if user has manually closed the sidebar
const manualOpen = ref(false) // set to true if user has manually opened the sidebar

const breakpoint = 1024

const trigger = () => {
    open.value = !open.value
    manualClose.value = !open.value
    if (window.innerWidth < breakpoint) {
        manualOpen.value = open.value
    }
}

const resizeHandler = () => {
    requestAnimationFrame(() => {
        if (open.value && window.innerWidth < breakpoint) {
            if (manualOpen.value) return
            open.value = false
            manualClose.value = false
        }
        else if (!open.value && window.innerWidth >= breakpoint) {
            if (manualClose.value) return
            open.value = true
        }
    })
}

onMounted(() => {
    window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
})
</script>