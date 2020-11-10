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
                <span class="badge badge-secondary float-right ml-2" v-if="item.category">呵呵{{item.category}}</span>
                <h5 class="card-title">
                <a href="#" class="text-dark" v-if='item.title'>呵呵{{item.title}}</a>
                </h5>
                <p class="card-text" v-if="item.content">{{item.content}}呵呵</p>
                <div class="d-flex justify-content-between align-items-baseline">
                <del class="h6" v-if="item.origin_price">{{item.origin_price}}呵呵</del>
                <div class="h5" v-if="item.price">{{item.price}}呵呵</div>
                </div>
            </div>
            <div class="card-footer d-flex">
                <button type="button" class="btn btn-outline-secondary btn-sm">
                <i class="fas fa-spinner fa-spin"></i>
                查看更多
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm ml-auto">
                <i class="fas fa-spinner fa-spin"></i>
                加到購物車
                </button>
            </div>
            </div>
            </div>
        </div>
        <nav aria-label="Page navigation example" v-if="pagination.total_pages>1">
            <ul class="pagination" v-for="page in pagination" :key='page'>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous" @click="getOrder(current_page-1)"
                :class="{'disabled':!page.has_pre}">
                <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" v-if='page==page.current_page'>{{page}}</a></li>
            <li class="page-item">
                <a class="page-link" :class="{'disabled':!page.has_next}" href="#" aria-label="Next" @click="getOrder(current_page+1)">
                <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
        </nav>
    </div>
</template>
<script>
var apipath = process.env.APIPATH;
var custom = process.env.CUSTOMPATH;
export default {
    data(){
        return{
            products:[],
            pagination:{},
            isLoading: false,
        }
    },
    methods:{
        getOrder(page=1){
            const vm=this;
            const api = `${apipath}/api/${custom}/products?page=${page}`;
            vm.isLoading=true;
            this.$http.get(api).then((response)=>{
                vm.products=response.data.products;
                vm.pagination=response.data.pagination;
                console.log(vm.products, vm.pagination)
                this.isLoading=false;
            })
            
        }
    },
    created(){
         this.getOrder();
    }

}
</script>