<template>
    <div class="flex justify-between flex-col sm:flex-row">
        <div class="flex items-center justify-between sm:justify-start">
            <div class="flex items-center text-sm">
                <div class="row-select-container">
                    <Select :options="rowsOptions" v-model="localRowsPerPage" @change="rowsChange" />
                </div>
                <div class="ml-2">{{ $t('per_page') }}</div>
            </div>
            <div class="mx-2 h-4 hidden sm:block border-text-base border-l"></div>
            <div v-if="totalItems" class="text-sm ml-2 sm:ml-0 text-end">{{ $t('items_count_desc', {itemRange: itemRange, totalItemsCount: totalItems }) }}</div>
        </div>
        <div v-if="totalPages > 1" class="flex flex-row justify-end items-center mt-3 sm:mt-0 ">
            <form @submit.prevent="jumpSubmit" novalidate class="flex items-center mr-2 justify-end pr-2 border-text-base border-r">
                <label :for="inputId" class="cursor-pointer pr-2 border border-primary rounded">
                    <input type="tel" :id="inputId" v-model="page" @focus="pageInputFocusedHandler" @blur="pageInputBlurredHandler" min="1" :max="totalPages" class="text-sm py-0 px-1 o-number bg-transparent text-end outline-none w-8" autocomplete="off">
                    <span class="text-sm text-primary">/ {{ totalPages }}</span>
                </label>
                <button type="submit" class=" text-sm inline h-full cancel border-none px-4 text-primary font-semibold">
                    <span>{{$t('jump_to_page')}}</span>
                </button>
            </form>
            <button class="font-semibold text-sm text-primary px-2 mr-2 disabled:opacity-40" :disabled="modelValue == 1" @click="previousPage()">{{$t('previous_short')}}</button>
            <button class="font-semibold text-sm text-primary px-2 disabled:opacity-40" :disabled="modelValue + 1 > totalPages" @click="nextPage()">{{$t('next')}}</button>
        </div>
    </div>
</template>

<script setup>
const {$randomId} = useNuxtApp()
const props = defineProps({
    totalPages: Number,
    totalItems: Number,
    // currentPageItems: Number,
    modelValue: Number,
    rowsPerPage: Number
})

const emit = defineEmits(['update:modelValue', 'rowsChange'])

const itemRange = computed(() => {
    const startAt = (props.modelValue - 1) * props.rowsPerPage + 1
    let endAt = props.modelValue * props.rowsPerPage
    if (endAt > props.totalItems) endAt = props.totalItems
    return `${startAt} — ${endAt}`
})

/* rows dropdown */
const rowsOptions = [{
    text: '10',
    value: 10
}, {
    text: '15',
    value: 15
}, {
    text: '20',
    value: 20
}, {
    text: '30',
    value: 30
}, {
    text: '50',
    value: 50
}]

const localRowsPerPage = ref(10)
const rowsChange = (v) => {
    emit('rowsChange', v)
}
watch(() => props.rowsPerPage, (newValue) => {
    localRowsPerPage.value = props.rowsPerPage
}, {immediate: true})

const nextPage = () => {
    if (props.modelValue + 1 <= props.totalPages)
        emit('update:modelValue', props.modelValue + 1)
}

const previousPage = () =>  {
    if (props.modelValue - 1 > 0)
        emit('update:modelValue', props.modelValue - 1)
}

/* page input */
const inputId = `pgnt_${$randomId()}`

const page = ref('') // v-model for page input

const pageInputFocusedHandler = (e) => {
    setTimeout(() => {
        const endPos = e.target.value.length
        e.target.setSelectionRange(endPos, endPos)
    }, 50)
}

const pageInputBlurredHandler = (e) => {
    setTimeout(() => {
        let jumpValue = parseInt(e.target.value)
        if (!jumpValue || jumpValue < 1 || jumpValue > props.totalPages) {
            page.value = `${props.modelValue}`
            return
        }
    }, 100)
}

watch(() => props.modelValue, (val) => {
    page.value = `${val}`
}, {immediate: true})

const jumpSubmit = (e) => {
    let jumpValue = parseInt(page.value)
    if (!jumpValue || jumpValue < 1 || jumpValue > props.totalPages) {
        page.value = `${props.modelValue}`
        return
    }
    toPage(jumpValue)
}

const toPage = (p) => {
    if (p != props.modelValue)
        emit('update:modelValue', p)
}
</script>

<style scoped>
.row-select-container :deep(.o-input) {
    padding-top: 0.125em;
    padding-bottom: 0.125em;
    /* border-radius: 0.25rem; */
}
</style>