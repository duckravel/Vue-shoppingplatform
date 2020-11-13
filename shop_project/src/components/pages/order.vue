<template>
   <div>
       <table class="table mt-4">
        <thead>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
        </thead>
        <!-- <tbody v-for='item in orders' :key='item.id'>
            <td>{{}}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
                <ul>
                    <li v-for='obj in item.products' :key='obj.id'>
                        {{ obj.product.title }} 數量：{{ product.qty }}
                        {{ product.product.unit }}
                    </li>
                </ul>
            </td>
            <td></td>
            <td></td>
        </tbody> -->

       </table>
   </div>
</template>
<script>
import $ from 'jquery';
var apipath = process.env.APIPATH;
var custom = process.env.CUSTOMPATH;

export default {
    data(){return {
        order:[],
        isloading:false,
        pagination:[],
    }
    },
    methods:{
        getOrder(page=1){
            const vm=this;
            let api = `${apipath}/api/${custom}/admin/orders?page=${page}`;
            this.$http.get(api).then((response)=>{
                console.log(response.data.orders);
                vm.orders = response.data.orders;
                vm.pagination = response.data.pagination;
                vm.isLoading = false;
            })
            
        }
    },
    created(){
        this.getOrder();
    }

}
</script>