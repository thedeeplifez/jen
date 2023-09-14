import dogForm from 'vue-dog-form'

export default defineNuxtPlugin(nuxtApp => {
    const { $i18n } = useNuxtApp()
    nuxtApp.vueApp.use(dogForm, {
        message(error) {
            const translateKey = `error_${error.type}`
            return error.value?.n ? $i18n.t(translateKey, {n : error.value.n}) : $i18n.t(translateKey)
        },
        /* customRules: {
            validphone: {
                rule(val) {
                    let vals = val.split('-')
                    if (vals.length < 2 || !vals[1]) {
                        return {
                            type: 'validphone',
                            value: {}
                        }
                    }
                    return {}
                }
            },
            message: 'error_validphone' // actually not used since we use the message function above for translation
        } */
    })
})