import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data(){
        return{
            url:`https://vue3-course-api.hexschool.io/v2/`,
            api_path:`rita009`,
            products:[],
            temp:{},
        }
    },
    methods:{
        checkAdmin(){
            axios.post(`${this.url}api/user/check`)
                .then(function (res){
                    this.getData()
                })
                .catch(function(err){
                    window.location = 'login.html';
                })
        },
        getData(){
            axios.get(`${this.url}api/${this.api_path}/admin/products`)
                .then(function(res){
                    this.products = res.data.products;
                })
                .catch(function(err){
                    console.log(err);
                })
        },
        openProduct(item){
            this.temp = item
        }

    },
    mounted(){

        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        this.checkAdmin()
    }
}).mount('#app')