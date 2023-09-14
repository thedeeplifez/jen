<template>
    <div class="dpCalendarTable">
        <div style="display: flex;">
            <div class="dpHeadCell">Sun</div>
            <div class="dpHeadCell">Mon</div>
            <div class="dpHeadCell">Tue</div>
            <div class="dpHeadCell">Wed</div>
            <div class="dpHeadCell">Thu</div>
            <div class="dpHeadCell">Fri</div>
            <div class="dpHeadCell">Sat</div>
        </div>
        <div style="display: flex;flex-wrap: wrap;">
            <div
                v-for="d in days"
                :key="d.key"
                class="dpBodyCell"
                :class="{
                    light: d.notCurrentMonth,
                    selected: modelValueKey == d.key,
                    disabled: disabled(d)
                }"
                @click="selectDate(d)"
            >
                {{ d.date }}
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: Date,
    month: Number,
    year: Number,
    disabledDates: Function
})

const disabled = (dateEntry) => {
    if (typeof props.disabledDates == 'function') {
        return props.disabledDates(dateEntry)
    }
    return false
}

const modelValueKey = computed(() => {
    if (!props.modelValue) return ''
  /*   let monthValue = props.modelValue.getMonth() + 1
    let monthValueText = monthValue < 10 ? `0${monthValue}` : `${monthValue}`
    let dayValue = props.modelValue.getDate()
    let dayValueText = dayValue < 10 ? `0${dayValue}` : `${dayValue}`

    return `${props.modelValue.getFullYear()}-${monthValueText}-${dayValueText}` */
    return new Date(props.modelValue.getFullYear(), props.modelValue.getMonth(), props.modelValue.getDate()).getTime()
})

const days = ref([])
const generateCalendar = () => {
    const currentMonth = new Date(props.year, props.month, 1) // note: in js, month starts with 0
    const prevMonth = new Date(props.year, props.month, 0) // setting date to 0 means setting to last day of previous month
    const nextMonth = new Date(props.year, props.month + 1, 1)

    const prevMonthRange = {
        year: prevMonth.getFullYear(),
        month: prevMonth.getMonth(),
        startDate: prevMonth.getDate() - currentMonth.getDay() + 1, // first week of current month includes few days from previous month
        endDate: prevMonth.getDate()
    }

    const currentMonthRange = {
        year: props.year,
        month: props.month,
        startDate: 1,
        endDate: new Date(props.year, props.month + 1, 0).getDate()
    }

    const nextMonthRange = {
        year: nextMonth.getFullYear(),
        month: nextMonth.getMonth(),
        startDate: 1,
        // endDate: 6 - new Date(props.year, props.month + 1, 0).getDay() // last week of current month includes few day from next month
        endDate: 42 - (prevMonthRange.endDate - prevMonthRange.startDate + 1) - (currentMonthRange.endDate - currentMonthRange.startDate + 1)
    }

    let calendarDays = []
    let ranges = [prevMonthRange, currentMonthRange, nextMonthRange]
    ranges.forEach((range, rangeIndex) => {
        for (let date = range.startDate; date <= range.endDate; date++) {
            calendarDays.push({
                date: date,
                month: range.month,
                year: range.year,
                notCurrentMonth: rangeIndex != 1,
                key: new Date(range.year, range.month, date).getTime()
            })
        }
    })
    days.value = calendarDays
}
onMounted(() => {
    generateCalendar()
})

watch(() => props.month, () => {
    generateCalendar()
})

watch(() => props.year, () => {
    generateCalendar()
})

const emit = defineEmits(['update:modelValue', 'close'])
const selectDate = (dateEntry) => {
    // let selectedDate = new Date(dateEntry.year, dateEntry.month, dateEntry.date)
    let selectedDate = new Date(dateEntry.key)
    emit('update:modelValue', selectedDate)
    emit('close')
}
</script>

<style scoped>
.dpHeadCell {
    padding: 0.75em 0;
    width: calc(100% / 7);
    font-weight: 500;
    text-align: center;
    font-size: 0.75em;
}

.dpBodyCell {
    padding: 0.75em 0;
    cursor: pointer;
    border-collapse: collapse;
    width: calc(100% / 7);
    text-align: center;
    font-size: 0.75em;
}

.dpBodyCell.light {
    color: var(--o-text-light);
}
.dpBodyCell.disabled {
    color: var(--o-text-light);
    opacity: 0.6;
    pointer-events: none;
}

.dpBodyCell:hover {
    color: var(--o-primary);
}

.dpBodyCell.selected {
    color: var(--o-date-selected-text);
    background-color: var(--o-date-selected-bg);
}
</style>