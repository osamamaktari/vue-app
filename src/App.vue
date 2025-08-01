<script >
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';

import Donations from './views/Donations.vue';
import Home from './views/Home.vue';
export default {
  components: {
    HeaderComponent,SidebarComponent, Donations,Home
  }
};
</script>

<template>

 <HeaderComponent/>
 
  <RouterView></RouterView>
<SidebarComponent/>

</template>