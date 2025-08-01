<script  >

import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import Donations from './views/Donations.vue';
import Home from './views/Home.vue';

import ToastComponent from './components/ToastComponent.vue';
export default {
  components: {
    HeaderComponent,SidebarComponent, Donations,Home,ToastComponent
  }
  ,

};
</script>

<template>

 <HeaderComponent/>
 <ToastComponent/>

 
  <RouterView></RouterView>
<SidebarComponent/>

</template>