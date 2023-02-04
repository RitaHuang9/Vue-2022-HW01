import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from '../components/pagination.js';
import productModals from '../components/product-modal.js';
import delProductModals from '../components/del-product-modal.js';

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
            tempUploadImg:{}, //上傳圖片檔案
            isNew: false,
            page: {},
        }
    },
    methods: {
        // 確認是否已登入
        checkAdmin() {
            axios.post(`${url}api/user/check`)
                .then(() => {
                    this.getProduct();
                })
                .catch(() => {
                    alert`您尚未登入`
                    window.location = '../login.html';
                })
        },
        getProduct(page = 1) {
            axios.get(`${url}api/${api_path}/admin/products/?page=${page}`)
                .then((res) => {
                    this.products = res.data.products;
                    this.page = res.data.pagination
                })
                .catch(() => {
                    alert`尚未取得產品資訊`;
                })
        },
        // 判斷 Modal開啟時的狀態
        openModal(status, product) {
            // 新增資料
            if (status == 'add') {
                productModal.show();
                this.isNew = true;
                // 初始化
                this.tempProduct = {
                    imagesUrl: [],
                };
                // 編輯資料
            } else if (status == 'edit') {
                productModal.show();
                this.isNew = false;
                // 當入當前資料
                this.tempProduct = { ...product };
                // 刪除資料
            } else if (status == 'delete') {
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
                .catch(() => {
                    alert`產品資料更新錯誤`
                })
            
        },
        delProduct() {
            axios.delete(`${url}api/${api_path}/admin/product/${this.tempProduct.id}`)  //api資料結構在data裡
                .then(() => {
                    this.getProduct();
                    delProductModal.hide();
                })
                .catch(() => {
                    alert`刪除產品錯誤`;
                })
        },
        // 圖片上傳
        uploadImg(e) {
            this.tempUploadImg = e.target.files[0];
            const formData = new FormData();
            formData.append('file-to-upload', this.tempUploadImg);
            axios.post(`${url}api/${api_path}/admin/upload`, formData)
                .then((res)=>{
                    this.tempProduct.imageUrl = res.data.imageUrl;
                })
                .catch((err)=>{
                    alert (err.message);
                })
        },
    },
    // 區域註冊
    components: {
        pagination,
        productModals,
        delProductModals
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)rita009\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // https://github.com/axios/axios#global-axios-defaults
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();
        // model
        productModal = new bootstrap.Modal('#productModal');
        delProductModal = new bootstrap.Modal('#delProductModal');
        // productModal.show();  //確保程式沒錯
    },
}).mount('#app')