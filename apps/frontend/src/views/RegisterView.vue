<!-- filepath: apps/frontend/src/views/RegisterView.vue -->
<template>
  <div class="auth-form">
    <h2>Register</h2>
    <form @submit.prevent="onSubmit">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">Register</button>
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
    // TODO: Call register API here
    // Example: await register(form.value)
  } catch (e: any) {
    error.value = e.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-form { max-width: 400px; margin: 2rem auto; }
.error { color: red; }
</style>