<template>
<div>
  <Navbar/>
  <Alert/>
    <div class="container-fluid">
      <div class="row">
        <Sidebar/>      
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
</div>
</template>
<script>

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Alert from './AlertMessage'
export default {
    components:{Navbar,Sidebar, Alert},
    created(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      this.$http.defaults.headers.common.Authorization = `${token}`;
    }
};
</script>

