<template>
  <div>
    <div class="container">
    </div>
  </div>
</template>
<script>
export default {
    name:'Dashboard',
    data:function(){return{}},
    created(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); 
        this.$http.defaults.headers.common['Authorization'] = `${token}`;
    }
}
</script>


