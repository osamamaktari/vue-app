import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Donations from "@/views/Donations.vue";  
import Analytics from "@/views/Analytics.vue";
import Projects from "@/views/Projects.vue";
import Settings from "@/views/Settings.vue";    
import Volunteers from "@/views/Volunteers.vue";


const routes = [

    
{ path: '/', name: 'home',component : Home },
{ path: '/Donations', name: 'Donations', component: Donations },
 { path: '/Volunteers', name: '/Volunteers', component: Volunteers },
 { path: '/Projects', name: 'Projects', component: Projects },
 { path: '/Analytics', name: 'Analytics', component: Analytics },
{path: '/Settings', name: 'Settings', component: Settings }
 
 ];
 const router = createRouter({
 history: createWebHistory(),
 routes
 })
 export default router;