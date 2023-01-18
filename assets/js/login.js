import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return{
            user:{
                username:'',
                password:'',
            }
        }
    },
    methods:{
        login() {
            const url = 'https://vue3-course-api.hexschool.io/v2/';
        

            axios.post(`${url}admin/signin`, this.user)
                .then(function (res) {
                    const { token, expired } = res.data;

                    // 到ndm複製（https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie）
                    document.cookie = `rita009=${token}; expires=${expired}`;
                    // https://github.com/axios/axios#global-axios-defaults
                    axios.defaults.headers.common['Authorization'] = token;  
                    //登入成功時取得token存入cookie
                    window.location = 'product.html';
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
}).mount('#app');

