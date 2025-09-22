<template>
  <AuthForm @submit="onSubmit">
    <template #title>Create Account</template>
    <div class="input-group">
      <input
        v-model="form.name"
        type="text"
        placeholder="Full Name"
        required
        class="modern-input"
      />
    </div>

    <div class="input-group">
      <input
        v-model="form.email"
        type="email"
        placeholder="Enter your email"
        required
        class="modern-input"
      />
    </div>

    <div class="input-group password-group">
      <input
        v-model="form.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Create a strong password"
        required
        class="modern-input"
        @input="checkPasswordStrength"
      />
      <button type="button" class="password-toggle" @click="showPassword = !showPassword">
        {{ showPassword ? '🙈' : '👁️' }}
      </button>

      <!-- Password Strength Indicator -->
      <div v-if="form.password" class="password-strength">
        <div class="strength-bar">
          <div
            class="strength-fill"
            :class="passwordStrength.class"
            :style="{ width: passwordStrength.width }"
          ></div>
        </div>
        <span class="strength-text" :class="passwordStrength.class">
          {{ passwordStrength.text }}
        </span>
      </div>
    </div>

    <div class="input-group">
      <input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm your password"
        required
        class="modern-input"
        :class="{
          'password-mismatch': form.confirmPassword && form.password !== form.confirmPassword,
        }"
      />
      <div
        v-if="form.confirmPassword && form.password !== form.confirmPassword"
        class="field-error"
      >
        Passwords don't match
      </div>
    </div>

    <button type="submit" :disabled="loading" class="modern-button register-button">
      <span v-if="!loading">Create Account</span>
      <span v-else>Creating Account...</span>
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </AuthForm>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AuthForm from '@/components/AuthForm.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

if(authStore.isAuthenticated) {
  router.push('/dashboard')
}

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.value.password
  if (!password) return { width: '0%', class: '', text: '' }

  let score = 0
  let checks = []

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 2) return { width: '25%', class: 'weak', text: 'Weak' }
  if (score <= 4) return { width: '50%', class: 'fair', text: 'Fair' }
  if (score <= 5) return { width: '75%', class: 'good', text: 'Good' }
  return { width: '100%', class: 'strong', text: 'Strong' }
})

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.name.trim() &&
    form.value.email.trim() &&
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password === form.value.confirmPassword &&
    passwordStrength.value.class !== 'weak'
  )
})

const checkPasswordStrength = () => {
  // Trigger reactivity for password strength indicator
}

const onSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true
  error.value = ''
  try {
    await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    })
    loading.value = false
    router.push('/login')
  } catch (e: any) {
    error.value = e.message || 'Registration failed'
    loading.value = false
  }
}
</script>

<style scoped>
.input-group {
  position: relative;
}

.password-group {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s ease;
}

.password-toggle:hover {
  background-color: #f1f5f9;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  width: 100%;
  height: 4px;
  background-color: #e2e8f0;
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.strength-fill.weak {
  background-color: #ef4444;
}
.strength-fill.fair {
  background-color: #f59e0b;
}
.strength-fill.good {
  background-color: #3b82f6;
}
.strength-fill.strong {
  background-color: #10b981;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 0.25rem;
  display: block;
}

.strength-text.weak {
  color: #ef4444;
}
.strength-text.fair {
  color: #f59e0b;
}
.strength-text.good {
  color: #3b82f6;
}
.strength-text.strong {
  color: #10b981;
}

.password-mismatch {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
}

.field-error {
  color: #ef4444;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  font-weight: 500;
}

.checkbox-group {
  margin: 0.5rem 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.5;
  cursor: pointer;
}

.modern-checkbox {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 0.25rem;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.modern-checkbox:checked {
  background-color: #00b4d8;
  border-color: #00b4d8;
}

.modern-checkbox:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  font-weight: bold;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.terms-link {
  color: #00b4d8;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

.register-button {
  background: linear-gradient(135deg, #10b981, #059669);
}

.register-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #059669, #047857);
}

.register-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
}

.login-prompt {
  color: #6b7280;
  font-size: 0.875rem;
}

.login-link {
  color: #00b4d8;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.login-link:hover {
  color: #0077b6;
  text-decoration: underline;
}

/* Enhanced input styling for register form */
:deep(.modern-input) {
  padding-right: 3rem; /* Make room for password toggle */
}

.password-group :deep(.modern-input) {
  padding-right: 3rem;
}

.input-group:not(.password-group) :deep(.modern-input) {
  padding-right: 1rem;
}
</style>
