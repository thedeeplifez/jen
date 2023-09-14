<template>
    <div class="o-radio-wrapper">
        <div class="o-radio" :class="{checked: value == modelValue}" @click="toggle" :style="radioSize"></div>
        <input type="radio" :value="value" style="display:none;" :required="required" :checked="value == modelValue">
        <label class="form-check-label o-radio-label" @click="toggle"><slot></slot></label>
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Number],
        required: true
    },
    value: {
        type: [String, Number],
        required: true
    },
    size: Number,
    required: Boolean
})

const radioSize = computed(() => {
    if (typeof props.size == 'number') {
        return {fontSize: `${props.size}px`}
    }
    else {
        return {}
    }
})

const emit = defineEmits(['update:modelValue'])
const toggle = () => {
    emit('update:modelValue', props.value.toString())
}
</script>

<style scoped>
.o-radio-wrapper {
    display: inline-flex;
    align-items: center;
}

.o-radio {
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    /* margin-right: 0.25em; */
    border: 1px solid var(--o-border-color);
    background-color: var(--o-bg);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.15s;
    position: relative;
    flex-shrink: 0;
}

.o-radio::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    height: 0.6em;
    width: 0.6em;
    background-color: var(--o-primary);
    transition: all 0.15s;
    box-sizing: border-box;
    border-radius: 50%;
}

.o-radio.checked::after {
    transform: translate(-50%, -50%) scale(1);
}

.o-radio.checked.disabled {
    background-color: var(--o-primary-light);
}

.o-radio-label {
    display: inline-block;
    margin-left: 0.75em;
    cursor: pointer;
}
</style>