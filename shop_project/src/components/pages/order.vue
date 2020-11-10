<template>
    <div>
        <div class="row mt-4">
            <div class="card mb-3 col-4 p-0">
                <img src="" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6></h6>
                    <div class='row m-0 align-items-end align-items-baseline'>
                        <p class="col-auto mr-auto h6" style="text-decoration:line-through">原價只要</p>
                        <h5 class=""> 現在價格</h5>
                    </div>
                    
                </div>
                <div class="card-footer text-muted row m-0">
                        <button type="button" class="btn btn-outline-secondary col-auto mr-auto"><i class="fas fa-spinner fa-spin"></i>查看更多</button>
                        <button type="button" class="btn btn-outline-danger "><i class="fas fa-spinner fa-spin"></i>加到購物車</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        getOrder(){
            const api=``;
            
        }
    },
    created(){
        // this.getOrder();
    }

}
</script>