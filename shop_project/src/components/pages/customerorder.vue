<template>
    <div>
    <loading :active.sync='isLoading'></loading>
    <div class="row mt-4" >
        <div class="col-md-4 mb-4" v-for="item in products" :key='item.id'>
        <div class="card border-0 shadow-sm">
        <div style="height: 150px; background-size: cover; background-position: center"
        :style="{backgroundImage: `url(${item.imageUrl})`}"
            >
        </div>
        <div class="card-body">
            <span class="badge badge-secondary float-right ml-2" v-if="item.category">{{item.category}}</span>
            <h5 class="card-title">
            <a href="#" class="text-dark" v-if='item.title'>{{item.title}}</a>
            </h5>
            <p class="card-text" v-if="item.content">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
            <del class="h6" v-if="item.origin_price">{{item.origin_price|currency}}</del>
            <div class="h5" v-if="item.price">{{item.price|currency}}</div>
            </div>
        </div>
        <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getitem(item)">
            <i class="fas fa-spinner fa-spin" v-if='status.loadingItem==item.id'></i>
            查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addtoCart(item.id, 1)">
            <i class="fas fa-spinner fa-spin" v-if='status.loadingItem==item.id'></i>
            加到購物車
            </button>
        </div>
        </div>
        </div>
    </div>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
            <a class="page-link" href="#" aria-label="Previous" @click="getPro(pagination.current_page-1)"
            >
            <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key='page'>
            <a class="page-link" href="#" v-if='page==pagination.current_page'>{{page}}</a></li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
            <a class="page-link"  href="#" aria-label="Next" @click="getPro(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
    </nav>
    <!-- cartlist -->
    <div>
    <div class="my-5 row justify-content-center">
    <div class="col-md-6">
    <table  class="table mt-4">
        <thead>
            <tr>
                <th >刪除品項</th>
                <th >品名</th>
                <th >數量</th>
                <th>單價</th>
            </tr>
        </thead>
        <tbody >
            <tr v-for="(item,i) in carts.carts" :key='i'>
                <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
                </td>
                <td>{{item.product.title}}
                    <div v-if="item.coupon" class="text-success">
                        已套用優惠券
                    </div>
                </td>
                <td>{{item.product.num}} {{item.product.unit}}</td>
                <td>{{item.product.price}}</td>
            </tr>
        </tbody>
        <tfoot>
            <td colspan="3" class="text-right">總計</td>
            <td>{{carts.total}}</td>
        </tfoot>
        <tfoot v-if="carts.final_total<carts.total">
            <td colspan="3" class="text-success text-right">折扣價</td>
            <td class="text-success">{{carts.final_total}}</td>
        </tfoot>
    </table>
    <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model='coupon_code' placeholder="請填入優惠碼">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click.prevent="addCoupon">套用優惠碼</button>
        </div>
    </div>
    </div>
    </div>
    </div>
    <!-- 用戶資訊 -->
    <div class="my-5 row justify-content-center">
  <form class="col-md-6">
    <div class="form-group">
      <label for="useremail">Email</label>
      <input type="email" class="form-control" name="email" id="useremail"
        v-model="form.user.email" placeholder="請輸入 Email" v-validate="'required|email'">
      <span class="text-danger"  v-if="errors.has('email')">{{errors.first('email')}}</span>
    </div>
  
    <div class="form-group">
      <label for="username" >收件人姓名</label>
      <input type="text"  class="form-control" name="name" id="username"
        v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'"> 
      <span class="text-danger" v-if="errors.has('name')">收件人姓名不得為空</span>
    </div>
  
    <div class="form-group">
      <label for="usertel">收件人電話</label>
      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
    </div>
  
    <div class="form-group">
      <label for="useraddress">收件人地址</label>
      <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
        placeholder="請輸入地址" v-validate="'required'">
      <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
    </div>
  
    <div class="form-group">
      <label for="comment">留言</label>
      <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
    </div>
    <div class="text-right">
      <button class="btn btn-danger" @click.prevent="createOrder">送出訂單</button>
    </div>
  </form>
</div>
    
<!-- Modal -->
<div class="modal fade" id="Product" tabindex="-1" role="dialog" aria-labelledby="ProductTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="ProductTitle">{{product.title}}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        
      </div>
    </div>
</div>
</div>
</template>
<script>
import $ from 'jquery';
var apipath = process.env.APIPATH;
var custom = process.env.CUSTOMPATH;
export default {
    data(){
        return{
            products:[],
            pagination:{},
            status:{
                loadingItem:''
            },
            isLoading: false,
            product:[],
            carts:[],
            coupon_code:'',
            final_total:0,
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                }
                ,message:'',
            },
        }
    },
    methods:{
        getPro(page=1){
            const vm=this;
            let api = `${apipath}/api/${custom}/products?page=${page}`;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
                this.isLoading=false;
            })
        },
        getitem(item){
            const vm=this;
            let api = `${apipath}/api/${custom}/product/${item.id}`;
            vm.status.loadingItem=item.id;
            this.$http.get(api).then((response)=>{
                vm.product=response.data.product;
                $('#Product').modal('show');
                vm.status.loadingItem='';
            });
        },
        addtoCart(id,num){
            const vm=this;
            let api = `${apipath}/api/${custom}/cart`;
            this.$http.post(api,{data:{product_id:id,qty:num}}).then(
                (response)=>{
                    this.getCarts();
                    if (response.data.success){
                        $('#Product').modal('hide');
                        this.$bus.$emit('messsage:push',response.data.message,'success');
                    }
                }
            )
        },
        getCarts(){
            const vm=this;
            let api = `${apipath}/api/${custom}/cart`;
            this.$http.get(api).then((response)=>{
                vm.carts=response.data.data;

            });
        },
        removeCartItem(id){
            const vm=this;
            let api = `${apipath}/api/${custom}/cart/${id}`;
            this.$http.delete(api).then((response)=>{
                if(response.data.success) {this.getCarts();
                this.$bus.$emit('messsage:push',response.data.message,'success');
                }
            });
        }
        ,addCoupon(){
            const vm=this;
            let api = `${apipath}/api/${custom}/coupon`
            this.$http.post(api,{data:{code:vm.coupon_code}}).then(
                (res)=>{console.log(res.data); if(res.data.success){
                    this.$bus.$emit('messsage:push',res.data.message,'success');}
                else{ this.$bus.$emit('messsage:push',res.data.message,'danger');}    
                }
                
            );
        },
        createOrder(){
            const vm=this;
            let api = `${apipath}/api/${custom}/order`
            this.$validator.validate().then((result)=>{
                if(!result){
                    this.$bus.$emit('messsage:push','欄位有誤','danger');    
                }else{this.$http.post(api,{data:vm.form}).then(
                (res)=>{console.log(res.data); 
                if(res.data.success){
                vm.$router.push(`/customer_checkout/${res.data.id}`)
                this.$bus.$emit('messsage:push',res.data.message,'success');}
                else{ this.$bus.$emit('messsage:push',res.data.message,'danger');}    
                }  );
                }
            })
        }
        ,getOrder(page){
            
        }
        ,
    },
    created(){
         this.getPro();
         this.getCarts();
    }

}
</script>