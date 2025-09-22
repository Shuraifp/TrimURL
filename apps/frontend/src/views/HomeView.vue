<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <main class="home">
    <div class="left-half">
      <section v-if="!auth.isAuthenticated" class="banner">
        <h1>Welcome to TrimURL</h1>
        <p>
          Securely shorten your URLs with authentication. Create an account to manage your links and
          track them with ease.
        </p>
        <div class="actions">
          <button @click="goToLogin" class="btn secondary">Get Started ></button>
        </div>
      </section>

      <section v-else class="shortener">
        <h2>Shorten a URL</h2>
        <div class="shortener-box">
          <input type="text" placeholder="Enter long URL here" />
          <button class="btn success">Shorten</button>
        </div>
      </section>
    </div>
    <div class="right-half">
      <h1>The Fastest Way to Shorten and Share Your Links</h1>
    </div>
  </main>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #0f2027, #2c5364, #00b4d8);
  color: white;
}

.left-half {
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 3rem;
}

.right-half {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.right-half h1 {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  max-width: 400px;
}


.banner {
  max-width: 600px;
}

.banner h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.banner p {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.shortener {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 500px;
  text-align: left;
}

.shortener h2 {
  margin-bottom: 1rem;
}

.shortener-box {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.shortener-box input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
}

.user-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

.btn.primary {
  background: white;
  color: #2c5364;
}

.btn.secondary {
  background: #00b4d8;
  color: white;
}

.btn.success {
  background: #28a745;
  color: white;
}

.btn.info {
  background: #007bff;
  color: white;
}

.btn.danger {
  background: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.85;
}
</style>
