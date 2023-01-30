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
        login(identity) {
            const url = 'https://vue3-course-api.hexschool.io/v2/';
            axios.post(`${url}admin/signin`, this.user)
                .then(function (res) {
                    const { token, expired } = res.data;

                    // 到ndm複製（https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie）
                    document.cookie = `rita009=${token}; expires=${expired}`;
                    // 登入頁面不需要在讀取 Cookie 拿到 token 後賦予到 headers 上，因為登入頁面不需要做驗證行為，只需將登入成功時取得的 token 寫入 cookie 即可。
                    if(identity == '一般使用者'){
                        window.location = 'product.html';
                    }else if(identity == '管理者'){
                        window.location = './backstage/products.html';
                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }
}).mount('#app');

