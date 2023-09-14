<template>
    <div>
            <div class="o-input-wrapper right cursor-pointer o-select-container" @click="toggle" ref="select"
                :class="{open: open}">
                <div class="o-input right" :class="selectClass">
                    <div v-show="search && open">
                        <input type="text" class="o-select-lg-input" ref="lgSearchInput" v-model="searchVal" placeholder="Search" @input="searchApi">
                    </div>
                    <div v-show="!search || !open">
                        <div v-if="!multiple">
                            <div v-if="selectedOption" class="text-ellipsis overflow-hidden whitespace-nowrap">
                                <img v-if="selectedOption.icon" :src="selectedOption.icon">
                                <span v-if="selectedOption">{{labelValue ? selectedOption.value : unref(selectedOption.text)}}</span>
                            </div>
                            <div v-else>&nbsp;</div>
                        </div>
                        <div v-if="multiple && modelValue.length > 0" class="o-select-pills-wrapper">
                            <div class="o-select-pill" v-for="o in modelValue" :key="o">{{labelValue ? o: (unref(optionsMap[o]) || '')}}</div>
                        </div>
                        <div v-if="multiple && modelValue.length == 0">
                            <div>&nbsp;</div>
                        </div>
                    </div>
                </div>
                <div class="o-icon right">
                    <svg class="o-select-arrow" xmlns="http://www.w3.org/2000/svg" width="12.121" height="7.121"
                        viewBox="0 0 12.121 7.121">
                        <g transform="translate(-153.9 -3.939)">
                            <line x2="5" y2="5" transform="translate(154.96 5)" fill="none" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                            <line x1="5" y2="5" transform="translate(159.96 5)" fill="none" stroke="currentColor"
                                stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
                        </g>
                    </svg>
                </div>
            </div>
            <ClientOnly>
                <OptionsWrapper :open="open" :el="select" @close="open=false" :wrapperClass="dropdownClass">              
                    <div class="o-select-label-container">
                        <div>
                            <div v-if="label">{{label}}</div>
                        </div>
                        <button class="o-select-close" @click="open=false">&times;</button>
                    </div>
                    <div v-if="search" class="o-select-search-container">
                        <input type="text" v-model="searchVal" class="o-input" placeholder="Search" @input="searchApi"/>
                    </div>
                    <div class="o-select-options-container content-scrollbar">
                        <div class="o-select-body" :class="{multiple: multiple}">
                            <div v-for="o in filteredOption" :key="o.id ? o.id : o.value" class="o-select-option"
                                :class="{selected: isSelected(o.value)}" @click="selectOption(o)">
                                <div v-if="multiple" class="o-checkbox" :class="{checked: isSelected(o.value)}"></div>
                                <img v-if="o.icon" :src="o.icon" />
                                <span>{{unref(o.text)}}</span>
                            </div>
                            <div v-if="filteredOption.length == 0" class="o-select-option text-center">No Results Found</div>
                        </div>
                    </div>
                </OptionsWrapper>
            </ClientOnly>

    </div>
</template>

<script setup>
const props = defineProps({
    options: {
        type: Array,
        required: true
    },
    modelValue: {
        type: [Number, String, Array],
        required: true
    },
    multiple: Boolean,
    search: Boolean,
    minWidth: Number,
    labelValue: Boolean,
    label: String,
    selectClass: String,
    dropdownClass: String,
    api: Boolean
})

const selectedOption = computed(() => {
    return props.options.find(o => o.value == props.modelValue)
})

const isSelected = (val) => {
    if (typeof props.modelValue == 'string' || typeof props.modelValue == 'number') {
        return val == props.modelValue
    }
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.indexOf(val) > -1
    }
}

const searchVal = ref('')
const filteredOption = computed(() => {
    if (!searchVal.value) return props.options
    return props.options.filter(o => o.text.toLowerCase().indexOf(searchVal.value.toLowerCase()) > -1)
})

const emit = defineEmits(['update:modelValue', 'search', 'change'])
const searchBufferTimer = ref()
const searchApi = (e) => {
    if (!props.api) return
    if (searchBufferTimer.value) clearTimeout(searchBufferTimer.value)
    searchBufferTimer.value = setTimeout(() => {
        if (e.target.value)
        emit('search', e.target.value)
    }, 300)
}

const optionsMap = computed(() => {
    let nO = {}
    props.options.forEach(o => {
        nO[o.value] = o.text
    })
    return nO
})


const selectOption = (o) => {
    if (typeof props.modelValue == 'string' || typeof props.modelValue == 'number') {
        emit('update:modelValue', o.value)
        emit('change', o.value)
        open.value = false
        return
    }
    if (Array.isArray(props.modelValue)) {
        let newVal = [...props.modelValue]
        if (newVal.indexOf(o.value) > -1) {
            newVal = newVal.filter(v => v != o.value)
        }
        else {
            newVal.push(o.value)
        }
        emit('update:modelValue', newVal)
        emit('change', newVal)
    }
}

const open = ref(false)
const lgSearchInput = ref()
const toggle = () => {
    if (!open.value) {
        open.value = true
        if (props.search && window.innerWidth > 768) {
            nextTick(() => {
                lgSearchInput.value.focus()
            })
        }
    }
    else if (!props.search) {
        open.value = false
    }
    
}
watch(open, (v) => {
    if (!v) { // when dropdown is closed
        searchVal.value = ''
    }
})

const select = ref(null)
</script>

<style scoped>
.o-select-lg-input {
    outline: none;
}
.o-select-label-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 1rem;
}

.o-select-close {
    line-height: 1;
    font-size: 1.5rem;
    padding-left: 0.75rem;
    border: none;
    background-color: transparent;
    font-size: 30px;
    line-height: 0.65;
    padding-right: 0;
}

.o-select-search-container {
    flex-shrink: 0;
}

.o-select-search-container {
    padding: 0 1rem 1rem;
}

@media screen and (min-width: 768px) {
    .o-select-label-container {
        display: none;
    }

    .o-select-close {
        display: none;
    }
    .o-select-search-container {
        /* padding: 0.75rem; */
        display: none;
    }
}

.o-select-options-container {
    width: 100%;
    overflow: auto;
    flex-grow: 1;
    font-size: 0.875em;
}

.o-select-search-container .o-input {
    font-size: 0.875em;
}

.o-select-pills-wrapper {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
}

.o-select-pill {
    font-size: 0.75rem;
    padding: 0.125rem 0.25rem;
    background-color: var(--o-option-selected-bg);
    color: var(--o-option-selected-text);
    margin-bottom: 0.125rem;
    margin-right: 0.25rem;
    user-select: none;
}

.o-select-body {
    border-radius: var(--o-border-radius);
}

.o-select-option {
    padding: 0.25em 1em;
    cursor: pointer;

}

.o-select-option img {
    margin-right: 1rem;
    width: 1.25rem;
}

.o-select-body .o-select-option:hover {
    background-color: var(--o-option-hover-bg);
    color: var(--o-option-selected-text);
}

.o-select-body:not(.multiple) .o-select-option.selected {
    background-color: var(--o-option-selected-bg);
    color: var(--o-option-selected-text);
}

.o-select-body.multiple .o-select-option {
    display: flex;
}

.o-select-body.multiple .o-checkbox {
    align-self: center;
    margin-right: 0.5em;
    width: 1em;
    height: 1em;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid var(--checkbox-border-color);
    background-color: var(--checbox-bg);
    border-radius: var(--checkbox-border-radius);
    cursor: pointer;
    transition: all 0.15s;
    position: relative;
    flex-shrink: 0;
    box-shadow: var(--o-shadow);
}

.o-select-body.multiple .o-checkbox.checked {
    background-color: var(--o-primary);
}

.o-select-body.multiple .o-checkbox::after {
    content: "";
    position: absolute;
    top: calc(50% - 0.04em);
    left: 50%;
    transform: translate(-50%, -50%) rotate(38deg) scale(0);
    width: 0.35em;
    height: 0.6em;
    border-right: 0.18em solid var(--tick-color);
    border-bottom: 0.18em solid var(--tick-color);
    transition: all 0.15s;
    box-sizing: border-box;
    box-shadow: var(--o-shadow);
}

.o-select-body.multiple .o-checkbox.checked::after {
    transform: translate(-50%, -50%) rotate(38deg) scale(1);
}
</style>