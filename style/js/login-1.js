import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            const url = 'https://vue3-course-api.hexschool.io/v2/';

            axios.post(`${url}admin/signin`, this.user)
            .then(function(res){

                console.log(res.data);
                const { token, expired } = res.data;

                document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                axios.defaults.headers.common['Authorization'] = token;

                window.location = 'product-1.html';
            })
        }
    }
}).mount('#app');

