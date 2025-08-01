<script  >

import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';



import Donations from './views/Donations.vue';
import Home from './views/Home.vue';

import ToastComponent from './components/ToastComponent.vue';
export default {
  components: {
    HeaderComponent,SidebarComponent, Donations,Home,ToastComponent
    ,FooterComponent
  }
  ,

};
</script>

<template>
<div  class="min-h-screen flex flex-col">
  
<HeaderComponent/>

<ToastComponent/>
<RouterView></RouterView>
<SidebarComponent/>

<FooterComponent/>
</div>
</template>