<template>
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <transition appear mode="out-in" name="side">
            <div :key="Component">
                <component :is="Component"/>
            </div>
        </transition>
      </router-view>
    </component>
  </template>
  
  <script>
  import { Home } from "@/views/home.vue";
  
  export default {
    computed: {
      Home() {
        return Home
      },
      layout() {
        return this.$route.meta.layout || 'div'
      }
    }
  }
  </script>

<style scoped>
.animated-bg {
  min-height: 100vh;
  background: linear-gradient(-45deg, #5BC0EB);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;
display: flex;  flex-direction: column;
  top: 0;
  left: 0;
}

@keyframes gradientAnimation {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
