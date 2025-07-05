<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="app-layout">
    <header class="main-header">
      <nav>
        <RouterLink to="/Home" class="nav-link">Inicio</RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView /> </main>
  </div>
</template>
