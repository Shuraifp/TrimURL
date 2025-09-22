<script setup lang="ts">
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="brand">
      <RouterLink to="/" class="brand-link">TrimURL</RouterLink>
    </div>

    <div class="nav-actions">
      <RouterLink v-if="auth.isAuthenticated && route.name !== 'dashboard'" class="dashboard" to="/dashboard"
        >Dashboard</RouterLink
      >
      <div class="links">
        <template v-if="auth.isAuthenticated">
          <button class="logout-btn" @click="handleLogout">Logout</button>
        </template>

        <template v-else>
          <RouterLink v-if="route.name === 'login'" to="/register">Register</RouterLink>

          <RouterLink v-else-if="route.name === 'register'" to="/login">Login</RouterLink>

          <template v-else>
            <RouterLink to="/login">Login</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
          </template>
        </template>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}

.brand {
  padding: 1rem;
}

.dashboard {
  font-size: 1.1rem;
  font-weight: bold;
}

.logout-btn {
  background: none;
  border: none;
  color: #f2f0e9;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}
.logout-btn:hover {
  text-decoration: underline;
  color: #0f96b8;
}

.brand-link {
  font-size: 2rem; /* Bigger text */
  font-weight: bold; /* Strong letters */
  color: var(--color-heading);
  text-transform: uppercase; /* Make it all caps */
  letter-spacing: 1px; /* Add spacing between letters */
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.links {
  background: #f7d048;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
}
.links a {
  color: #f2f0e9;
  font-weight: bold;
}
.links a:hover {
  text-decoration: underline;
  color: #0f96b8;
}
</style>
