<template>
	<div
		class="o-input relative !inline-flex items-center !w-auto !pr-12 overflow-hidden"
		:class="{focus: isFocused}"
		ref="inputWrapper"
		@click="handleWrapperClick"
	>
		<input
			type="number"
			class="tz-sub-input o-number text-right"
			min="0"
			max="12"
			placeholder="HH"
			ref="hourInput"
			@keydown="$filterNumberInput"
			@input="handleHourInput"
			@blur="blurHandler"
			@focus="focusHandler"
		/>
		<span class="mx-1" ref="separator">:</span>
		<input
			type="number"
			class="tz-sub-input o-number"
			min="0"
			max="59"
			placeholder="MM"
			ref="minuteInput"
			@keyup="handleMinuteKeyUp"
			@keydown="$filterNumberInput"
			@input="handleMinuteInput"
			@blur="blurHandler"
			@focus="focusHandler"
		/>
		<button
			class="hour-clock-btn"
			@click="changeClock"
			ref="hourClockBtn"
			@keyup="handleButtonKeyDown"
			@blur="blurHandler"
			@focus="focusHandler"
		>{{hourClock}}</button>
	</div>
</template>

<script setup>
const hourInput = ref()
const handleHourInput = (e) => {
	if (!e.target.value) return
	let valueNumber = parseInt(e.target.value)
	if (e.target.value.length > 1) minuteInput.value.focus()
	if (typeof valueNumber != 'number' || valueNumber > 12 || valueNumber < 0) e.target.value = '12'
	checkValue()
}

const minuteInput = ref()
const handleMinuteKeyUp = (e) => {
	if (e.code == 'Backspace' || e.key == 'Backspace') {
		if (e.target.value.length < 1) {
			hourInput.value.focus()
		}
	}
}
const handleMinuteInput = (e) => {
	if (!e.target.value) return
	let valueNumber = parseInt(e.target.value)
	if (e.target.value.length > 1) hourClockBtn.value.focus()
	if (typeof valueNumber != 'number' || valueNumber > 59 || valueNumber < 0) e.target.value = '59'
	checkValue()
}

const hourClockBtn = ref()
const hourClock = ref('AM')
const changeClock = () => {
	if (hourClock.value == 'AM') {
		hourClock.value = 'PM'
	} else if (hourClock.value == 'PM') {
		hourClock.value = 'AM'
	}
	checkValue()
}
const handleButtonKeyDown = (e) => {
	if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.key) > -1) {
		changeClock()
	}
}

const separator = ref()
const inputWrapper = ref()
const handleWrapperClick = (e) => {
	if (e.target == separator.value || e.target == inputWrapper.value) {
		hourInput.value.focus()
	}
}

const props = defineProps({
	modelValue: String
})
const emit = defineEmits(['update:modelValue'])
const checkValue = (dontEmit) => {
	if (!hourInput.value.value || !minuteInput.value.value) return
	let hourValue = parseInt(hourInput.value.value)
	let minuteValue = parseInt(minuteInput.value.value)
	if (hourClock.value == 'AM' && hourValue == 12) {
		hourValue = 0
		hourInput.value.value = '00'
	}
	else if (hourClock.value == 'PM' && hourValue == 0) {
		hourValue = 12
		hourInput.value.value = '12'
	}
	if (hourClock.value == 'PM' && hourValue < 12) {
		hourValue += 12
	}
	if (hourValue < 10) {
		hourValue = `0${hourValue}`
	}
	if (minuteValue < 10) {
		minuteValue = `0${minuteValue}`
	}
	if (!dontEmit) {
		emit('update:modelValue', `${hourValue}:${minuteValue}`)
	}
}

watch(() => props.modelValue, (value) => {
		syncModalValue()
})

const syncModalValue = () => {
	let valuePattern = new RegExp(/^\d{1,2}:\d{1,2}$/)
	if (!valuePattern.test(props.modelValue)) return
	try {
		let [hourString, minuteString] = props.modelValue.split(':')
		if (!hourString || !minuteString) return
		minuteInput.value.value = minuteString
		let hourValue = parseInt(hourString)
		let minuteValue = parseInt(minuteString)
		if (hourValue > 12) {
			hourInput.value.value = `${hourValue - 12}`
			hourClock.value = 'PM'
		}
		else {
			if (hourValue == 12 && minuteValue == 0) {
				hourClock.value = 'PM'
			}
			else {
				hourClock.value = 'AM'
			}
			hourInput.value.value = `${hourValue}`
		}
		checkValue()
	}
	catch(err) {
		console.log(err)
	}
}

onMounted(() => {
	syncModalValue()
})

const isFocused = ref(false)
const blurHandler = () => {
	isFocused.value = false
}
const focusHandler = () => {
	isFocused.value = true
}
</script>

<style scoped>
.tz-sub-input {
	width: 1.625em;
	outline: none;
	background-color: var(--o-bg);
}

.hour-clock-btn {
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	padding: 0 0.5em;
	transition: background-color 0.15s;
	width: 42px;
}
.hour-clock-btn:active,
.hour-clock-btn:hover {
	background-color: var(--primary);
	color: #fff;
}
</style>