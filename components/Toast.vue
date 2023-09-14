<template>
    <Teleport to="body">
        <div class="toast-wrapper">
            <transition-group name="toast" tag="div">
                <div class="toast-item shadow-sm px-4 py-3" v-for="v in toastStore.items" :key="v.id">
                    <div class="toast-details">
                        <div class="mr-3">
                            <svg v-if="!v.status" class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
                                <g transform="translate(-1425.359 -853.359)">
                                    <circle cx="17" cy="17" r="17" transform="translate(1425.359 853.359)" fill="#9d1414"/>
                                    <g transform="translate(1431.334 870.359) rotate(-45)">
                                    <path d="M0,0V15.592" transform="translate(7.797)" fill="none" stroke="#fff" stroke-width="2"/>
                                    <path d="M0,0V15.592" transform="translate(15.592 7.795) rotate(90)" fill="none" stroke="#fff" stroke-width="2"/>
                                    </g>
                                </g>
                            </svg>
                            <svg v-else class="toast-icon" xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34">
                                <g transform="translate(-1425.359 -853.359)">
                                    <circle cx="17" cy="17" r="17" transform="translate(1425.359 853.359)" fill="#27AE60"/>
                                    <path d="M0,0V8.32H16.189" transform="translate(1433.801 869.906) rotate(-45)" fill="none" stroke="#fff" stroke-width="3"/>
                                </g>
                            </svg>
                        </div>

                        <div>
                            <div class="toast-message text-sm">
                                {{v.message}}
                            </div>
                        </div>
                    </div>
                    <div class="toast-close ml-2 flex items-center self-center" @click="close(v.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.269" height="14.269" viewBox="0 0 14.269 14.269">
                            <g transform="translate(7.135 -4.306) rotate(45)">
                                <path d="M0,0H16.179" transform="translate(0 8.09)" fill="none" stroke="#848484" stroke-linecap="round" stroke-width="2"/>
                                <path d="M0,0H16.179" transform="translate(8.09 0) rotate(90)" fill="none" stroke="#848484" stroke-linecap="round" stroke-width="2"/>
                            </g>
                        </svg>
                    </div>
                    <div class="toast-loading" :class="{[v.status] : true}" :style="loadingWidth(v)"></div>
                </div>
            </transition-group>
        </div>
    </Teleport>
</template>

<script setup>
const toastStore = useToastStore()

const loadingWidth = (toastEntry) => {
    return {
        animationDuration: `${toastEntry.duration / 1000}s`
    }
}

const close = (toastEntryId) => {
    toastStore.remove(toastEntryId)
}
</script>

<style scoped>
@media screen and (min-width: 1px) {
    .toast-wrapper {
        max-width: 300px;
    }
}

@media screen and (min-width: 576px) {
    .toast-wrapper {
        max-width: 360px;
    }
}

.toast-wrapper {
    position: fixed;
    left: 50%;
    top: 60px;
    transform: translateX(-50%);
    width: 100%;
    z-index: 1051;
}

.toast-item {
    display: flex;
    border-radius: 5px;
    font-size: 16px;
    justify-content: space-between;
    position: fixed;
    background-color: var(--content);
    width: 100%;
}

.toast-details {
    display: flex;
    align-items: center;
}

.toast-icon {
    height: 1.5em;
    width: 1.5em;
}

.toast-close {
    cursor: pointer;
}

.toast-close svg {
    width: 15px;
    height: 15px;
    color: #888;
    transition: all 0.3s;
}

.toast-enter-active, .toast-leave-active {
    transition: all 0.3s;
}

.toast-enter-from, .toast-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

.toast-enter-to {
    opacity: 1;
    transform: translateX(0);
}

.toast-loading {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    width: 100%;
    border-radius: 3px;
    animation: shrink linear;
    animation-fill-mode: forwards;
}

.toast-loading.true {
    background-color: #27AE60;
}
.toast-loading.false {
    background-color: #9D1414;
}

@keyframes shrink {
    0% {
        width: 100%;
    }
    100% {
        width: 0%
    }
}
</style>
