<script setup>
import TopBar from '@/components/layout/TopBar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import NavBar from '@/components/layout/NavBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/ui/CartDrawer.vue'
</script>

<template>
  <div id="app" class="min-h-screen flex flex-col">
    <TopBar />
    <AppHeader />
    <NavBar />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <CartDrawer />
  </div>
</template>
