import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2/',
            api_path: 'rita009',
            products: [],
            temp: {},
        }
    },
    methods: {
        // 驗證登入
        checkAdmin() {
            axios.post(`${this.url}api/user/check`)
                .then((res) => {
                    this.getData();
                })
                .catch((err) => {
                    window.location = 'login.html';
                })
        },
        // 取得資料
        getData() {
            axios.get(`${this.url}api/${this.api_path}/admin/products`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        // 顯示單一產品資訊
        openProduct(item){
            this.temp = item;
        }
    },
    // 生命週期：頁面初始化
    mounted() {
        // cookie 取出
        // 當cookie有儲存就可以取出
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        // defaults 每次都會帶入
        this.checkAdmin();
    }
}).mount('#app');