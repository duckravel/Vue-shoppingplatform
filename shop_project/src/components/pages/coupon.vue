<template>
    <div>
        <loading :active.sync='isLoading'></loading>
            <div class="text-right">
            <div class="btn btn-primary btn-sm" @click="openModal(true)" >新增優惠券</div>
            </div>
            <table class="table mt-4">
                <thead>
                    <th>標題</th>
                    <th>折扣率</th>
                    <th>到期日</th>
                    <th>是否啟用</th>
                    <th>編輯</th>
                </thead>
                <tbody>
                    <tr v-for = '(item,index) in coupons' :key='index'>
                        <td>{{item.title}}</td>
                        <td>{{item.percent}} %</td>
                        <td>{{item.due_date | date }}</td>
                        <td :true-value="1" :false-value="0"> 
                            <p v-if='item.is_enabled' class="text-success"> V </p>
                            <p v-if='item.is_enabled' >   </p>
                        </td>
                        <td> <button class="btn btn-primary btn-sm" @click.prevent="openModal(false,item)">編輯</button>
                            <button class="btn btn-danger btn-sm"  @click.prevent="deleteCoupon(item)">刪除</button>
                        </td>
                        
                    </tr>
                </tbody>
            </table>
            <!-- Button trigger modal -->
        <!-- Modal -->
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="couponModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="couponModalLabel" v-if='isNew'>新增</h5>
                <h5 class="modal-title" id="couponModalLabel" v-else>編輯</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="coupontitle">標題</label>
                            <input v-model='tempCoupon.title' type="text" class="form-control" id="coupontitle" placeholder="標題">
                        </div>
                        <div class="form-group">
                            <label for="couponpercent">折扣率</label>
                            <input v-model='tempCoupon.percent' type="number" class="form-control" id="couponpercent" placeholder="折扣比">
                        </div>
                        <div class="form-check">
                            <input v-model='tempCoupon.is_enabled' class="form-check-input" type="checkbox" id="gridCheck"
                            :true-value="1" :false-value="0" :class="{'checked':tempCoupon.is_enabled}">
                            <label class="form-check-label" for="gridCheck">是否啟用</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group" v-if='isNew'>
                            <label for="formGroupExampleInput2">優惠券代碼</label>
                            <input v-model='tempCoupon.code' type="text" class="form-control" id="couponcode" placeholder="代碼">
                        </div>
                        <div class="form-group">
                            <label for="couponpercent">到期日</label>
                            <input v-model='due_date' type="date" class="form-control" id="couponpercent" placeholder="到期日">
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">Save changes</button>
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
    data(){return {
        coupons:[],
        isLoading:false,
        tempCoupon:[],
        isNew:false,
        due_date:this.formdate(new Date()),
    }},
    methods: {
        getCoupons(page=1){
            const vm = this;
            let api =  `${apipath}/api/${custom}/admin/coupons?page=${page}`;
            this.$http.get(api).then((res)=>
            { if (res.data.success){
                vm.coupons=res.data.coupons;
                }
            });
        }
        ,formdate(due_date){
            let year, month, date;
            year = new Date(due_date).getFullYear();
            month = new Date(due_date).getMonth();
            date = new Date(due_date).getDate();
            return `${year}-${month+1}-${date}`
        }
        ,openModal(isNew,item){
            const vm = this;
            if (isNew){vm.isNew=isNew; vm.tempCoupon = {};}
            else {
                vm.tempCoupon = Object.assign({}, item);
                let due_date = vm.formdate(item.due_date);
                vm.tempCoupon.due_date = due_date;
                vm.due_date = due_date;
                vm.isNew=isNew;
            }
            $('#couponModal').modal('show');
        }
        ,updateCoupon(){
            const vm = this;
            let api =  `${apipath}/api/${custom}/admin/coupon`;
            let httpMethod='post'; 
            vm.tempCoupon.due_date= Math.floor(new Date(vm.due_date).getTime());
            if(vm.isNew){
            this.$http[httpMethod](api,{data:vm.tempCoupon}).then((res)=>{
                if(res.data.success){$('#couponModal').modal('hide');this.getCoupons();}
            });}
            else{
                httpMethod='put';
                let api = `${apipath}/api/${custom}/admin/coupon/${vm.tempCoupon.id}`;
                this.$http[httpMethod](api,{data:vm.tempCoupon}).then((res)=>{
                if(res.data.success){$('#couponModal').modal('hide');this.getCoupons();}
            });}
            
        }
        ,deleteCoupon(item){
            let api = `${apipath}/api/${custom}/admin/coupon/${item.id}`;
                this.$http.delete(api).then((res)=>{
                this.getCoupons()}
            );
        }
        ,
    },
    created(){
        this.getCoupons();
    }

}
</script>