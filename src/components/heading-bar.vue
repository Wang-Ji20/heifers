<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav
    class="d-flex flex-wrap justify-content-between align-items-md-center py-1 mb-4 border-bottom text-dark text-decoration-none"
  >
    <RouterLink to="/" class="link-body-emphasis text-dark text-decoration-none">
      <p class="fw-bold">Heifers</p>
    </RouterLink>
    <ul class="nav nav-underline">
      <li class="nav nav-item">
        <RouterLink to="/trainer/interval" class="nav-link text-dark text-decoration-none">
          interval
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style></style>
