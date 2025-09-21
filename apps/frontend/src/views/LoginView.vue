<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    // TODO: Call login API here
    // Example: await login(form.value)
  } catch (e: any) {
    error.value = e.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form { max-width: 400px; margin: 2rem auto; }
.error { color: red; }
</style>