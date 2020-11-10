<template>
    <div>
        <div class="message-alert">
            <div class="alert alert-dismissable" :class="`alert-${item.status}`"
            v-for='(item,i) in messages' :key='i'>
            {{item.message}}
                <button type='button' class='close' @click='removeMessage(i)' aria-label='Close'> 
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:'Alert',
    data(){
        return{messages:[]}
    },
    methods:{
        updateMessage(message,status){
            const timestamp=Math.floor(new Date()/1000);
            console.log(message,status);
            this.messages.push({
                message,status,timestamp
            });
        this.removeMessageWithTiming(timestamp);
        },
        removeMessage(num){
            this.messages.splice(num,1);
        },
        removeMessageWithTiming(timestamp){
            const vm=this;
            setTimeout(()=>{
                vm.messages.forEach((item,index)=>{
                    if(item.timestamp===timestamp){
                        vm.messages.splice(index,1);
                    }
                })
            },5000);
        }
    },
    created() {
        const vm=this;
        vm.$bus.$on('messsage:push',(message,status='warning')=>{
            console.log(message,status);
            vm.updateMessage(message,status);
        });
        
    },
}
</script>
<style lang="">
    .message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 20px;
    z-index: 1100;
    }
    
</style>