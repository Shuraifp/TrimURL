<!-- Login.vue - Enhanced Version -->
<template>
  <AuthForm @submit="onSubmit">
    <template #title>Welcome Back</template>

    <div class="input-group">
      <input
        v-model="form.email"
        type="email"
        placeholder="Enter your email"
        required
        class="modern-input"
      />
    </div>

    <div class="input-group">
      <input
        v-model="form.password"
        type="password"
        placeholder="Enter your password"
        required
        class="modern-input"
      />
    </div>

    <button type="submit" :disabled="loading" class="modern-button">
      <span v-if="!loading">Sign In</span>
      <span v-else>Signing In...</span>
    </button>

    <p v-if="error" class="error">{{ error }}</p>

    <div class="auth-footer">
      <a href="#" class="forgot-link">Forgot your password?</a>
    </div>
  </AuthForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
if (authStore.isAuthenticated) {
  router.push('/dashboard')
}
const form = ref({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

const onSubmit = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(form.value)
    loading.value = false
    router.push('/')
  } catch (e: any) {
    error.value = e.message || 'Login failed'
    loading.value = false
  }
}
</script>

<style scoped>
.input-group {
  position: relative;
}

.modern-input {
  width: 100%;
}

.modern-button {
  margin-top: 0.5rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1rem;
}

.forgot-link {
  color: #00b4d8;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #0077b6;
  text-decoration: underline;
}
</style>
