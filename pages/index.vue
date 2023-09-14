<template>
    <div class="p-6">
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <div>
                    <input type="text" class="o-input">
                </div>
                <div class="mt-4">
                    <select class="o-input">
                        <option value="1">Red</option>
                        <option value="2">Blue</option>
                        <option value="3">Green</option>
                        <option value="4">Yellow</option>
                        <option value="5">Black</option>
                    </select>
                </div>
                <div class="mt-4">
                <Select :options="colorChoices" v-model="color" />
                </div>
                <div class="mt-4">
                    <div>
                        <Checkbox value="pineapple" v-model="toppings">Pinapple</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="chicken_slices" v-model="toppings">Chicken Slices</Checkbox>
                    </div>
                    <div>
                        <Checkbox value="tomato" v-model="toppings" switch>Tomato</Checkbox>
                    </div>
                </div>
                <div class="mt-4">
                    <div>
                        <Radio v-model="size" value="small">Small</Radio>
                    </div>
                    <div>
                        <Radio v-model="size" value="medium">Medium</Radio>
                    </div>
                    <div>
                        <Radio v-model="size" value="large">Large</Radio>
                    </div>
                </div>
                <div class="mt-4">
                    <div>
                        <div class="text-sm">Start Date</div>
                        <DatePicker v-model="startDate" />
                    </div>
                    <div class="mt-4">
                        <div class="text-sm">End Date</div>
                        <DatePicker v-model="endDate" :disabledDates="disabledEndDates" />
                    </div>
                </div>
                <div class="mt-4">
                    <button class="btn primary">Button</button>
                    <button class="btn outline-primary ml-5">Outline</button>
                    <button class="btn cancel ml-5">Cancel</button>
                </div>
            </div>
            <div>
                <div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { t } = useI18n()
// const { $toast } = useNuxtApp()
const config = useRuntimeConfig();

useSeoMeta({
	title: `${t('new_expense')} - ${config.public.TITLE}`
})

const color = ref('red')
const colorChoices = [{
    text: 'Red',
    value: 'red'
}, {
    text: 'Blue',
    value: 'blue'
}, {
    text: 'Green',
    value: 'green'
}, {
    text: 'Yellow',
    value: 'yellow'
}, {
    text: 'Black',
    value: 'black'
}]

const toppings = ref([])
const size = ref('')
const startDate = ref()
const endDate = ref()
const disabledEndDates = (dateEntry) => {
    if (!startDate.value) {
        return false
    }
    return dateEntry.key < startDate.value.getTime()
}

watchEffect(() => {
    if (startDate.value > endDate.value) {
        endDate.value = startDate.value
    }
})

onBeforeMount(() => {
    const today = new Date()
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay())
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)
    startDate.value = startOfWeek
    endDate.value = today
})
</script>