<template>
    <div>
        <div class="text-right">
            <div class="btn btn-outline-dark btn-sm" @click="openModal(true)" >建立新產品</div>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width='120'>分類</th>
                    <th>產品</th>
                    <th width='120' class="text-right">原價格</th>
                    <th width='120' class="text-right">目前價格</th>
                    <th width='120' >啟用狀態</th>
                    <th width='80' >編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='(item,key) in products' :key='key'>
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-right">{{item.origin_price}}</td>
                    <td class="text-right">{{item.price}}</td>
                    <td>
                        <span v-if='item.is_enabled' class="text-success">啟用</span>
                        <span v-else class="text-danger">未啟用</span>
                    </td>
                    <td>
                        <div class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</div>
                    </td>
                    
                </tr>

            </tbody>
        </table>
        <!-- Modal -->
        <div class="modal fade" id="ProductModal" tabindex="-1" role="dialog" aria-labelledby="ProductModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 class="modal-title " id="ProductModalLabel">新增產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            v-model="tempProduct.imageUrl"
                            placeholder="請輸入圖片連結">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="uploadFile">
                        </div>
                        <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            v-model="tempProduct.title"
                            placeholder="請輸入標題">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                            v-model="tempProduct.category"
                            placeholder="請輸入分類">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                            v-model="tempProduct.unit"
                            placeholder="請輸入單位">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                            v-model="tempProduct.origin_price"
                            placeholder="請輸入原價">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                            v-model="tempProduct.price"
                            placeholder="請輸入售價">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            v-model="tempProduct.description"
                            placeholder="請輸入產品描述"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            v-model="tempProduct.content"
                            placeholder="請輸入產品說明內容"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                            v-model="tempProduct.is_enabled"
                            :true-value="1"
                            :false-value="0"
                            id="is_enabled">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
/* global $ */
import $ from 'jquery';
var apipath = process.env.APIPATH;
var custom = process.env.CUSTOMPATH;
export default {
    data(){
        return{
            products:[],
            pagination: {},
            tempProduct: {},
            isNew: false,
            isLoading: false,
            status: {fileUploading: false,},
        }
    },
    methods:{
        getProducts(){
            const vm=this;
            const api = `${apipath}/api/${custom}/products/all`;
            this.$http.get(api).then((response) => {
                vm.products = response.data.products
                console.log(response.data)});
        },
        openModal(isNew,item){
            if (isNew){this.tempProduct={};this.isNew=true;}
            else{this.tempProduct=Object.assign({},item);
                this.isNew=false;
            }
            $('#ProductModal').modal('show');
        },
        updateProduct(){
            const vm=this;
            let api = `${apipath}/api/${custom}/admin/products`;
            let httpMethod='post'
            if (!vm.isNew){
                api = `${apipath}/api/${custom}/admin/products/${vm.tempProduct.id}`;
                httpMethod='put';
            }
            this.$http[httpMethod](api,{data:vm.tempProduct}).then((response) => {
                console.log(response.data);
                if (response.data.success){$('#productMoal').modal('hide');
                vm.getProducts();}
                else{$('#productMoal').modal('hide')    
                console.log('新增失敗');
                }
            });
        },
        uploadFile(){
            const uploadFile = this.$refs.files.files[0];
            const vm=this;
            const url=`${apipath}/api/${custom}/admin/upload`;
            const formData=new FormData();
            formData.append('file-to-upload',uploadFile);
            this.$http.post(url,formData,{
                header:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(response=>{
                console.log(response.data);
                vm.$set(vm.tempProduct,'imgUrl',response.data.imgUrl);
                });
        }
    },
    created(){
        this.getProducts()},
}
</script>