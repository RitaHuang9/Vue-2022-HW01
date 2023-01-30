import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/v2/',
    api_path = 'rita009';

let productModal = '',
    delProductModal = '';

createApp({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
        }
    },
    methods: {
        getProduct() {
            axios.get(`${url}api/${api_path}/admin/products/all`)
                .then((res) => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    console.log(err);
                })
        },
        openModal(status, product) {
            console.log(status, product);
            if (status == 'add') {
                productModal.show();
                this.isNew = true;
                // 初始化
                this.tempProduct = {
                    imagesUrl: [],
                };
            } else if (status == 'edit') {
                productModal.show();
                this.isNew = false;
                // 當入當前資料
                this.tempProduct = { ...product };
            }else if (status == 'delete'){
                delProductModal.show();
                this.tempProduct = { ...product }; //取資料內id
            }
        },
        updateProduct() {
            let urlNew = `${url}api/${api_path}/admin/product`
            let method = 'post';
            // 預設為新增，若為編輯則更換
            if (!this.isNew) {
                method = 'put';
                urlNew = `${url}api/${api_path}/admin/product/${this.tempProduct.id}`;
            }
            axios[method](urlNew, { data: this.tempProduct })  //api資料結構在data裡
                .then(() => {
                    // 新增/更新產品後，需要再次取得產品，並將modal關閉
                    this.getProduct();
                    productModal.hide();
                })
        },
        delProduct() {
            axios.delete(`${url}api/${api_path}/admin/product/${this.tempProduct.id}`)  //api資料結構在data裡
                .then(() => {
                    this.getProduct();
                    delProductModal.hide();
                })
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // https://github.com/axios/axios#global-axios-defaults
        axios.defaults.headers.common['Authorization'] = token;
        this.getProduct();
        // model
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
        // productModal.show();  //確保程式沒錯
    },
}).mount('#app')