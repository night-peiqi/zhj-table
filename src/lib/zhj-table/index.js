import ZhjTable from './lib'

const myPlugin = {
    install(Vue, options) {
        console.log(options)
        Vue.component('ZhjTable', ZhjTable)
    }
}

export default myPlugin