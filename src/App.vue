<script  >
import { ref, onMounted } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import SidebarComponent from './components/SidebarComponent.vue';
import Donations from './views/Donations.vue';
import Home from './views/Home.vue';

export default {
  components: {
    HeaderComponent,SidebarComponent, Donations,Home
  }
  ,
  setup() {
    const showToast = ref(false);

    onMounted(() => {
      showToast.value = true;
      setTimeout(() => {
        showToast.value = false;
      }, 4000); // التوست يختفي بعد 4 ثوانٍ
    });

    return { showToast };
  },
};
</script>

<template>

 <HeaderComponent/>
 

 
  <RouterView></RouterView>
<SidebarComponent/>

</template>