import type { AuthenticatedUser } from '@/types/user'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { LoginResponseDto } from '../../src/types/user'
import Swal from 'sweetalert2'

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthenticatedUser | null>(null)

  async function login(credentials: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Login failed')
      }

      const data: LoginResponseDto = await res.json()
      user.value = {
        id: data.user.id,
        avatar: data.user.avatar || '',
        email: data.user.email,
        username: data.user.name || '',
        token: data.access_token,
      }
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
      localStorage.setItem('auth', JSON.stringify(user.value))
    } catch (err) {
      throw err
    }
  }

  async function register(credentials: { name: string; email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await res.json()
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (err) {
      throw err
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('auth')
  }

  const isAuthenticated = computed(() => !!user.value)

  function init() {
    const stored = localStorage.getItem('auth')
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  return { user, isAuthenticated, login, register, logout, init }
})
