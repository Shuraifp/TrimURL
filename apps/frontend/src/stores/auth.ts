import type { AuthenticatedUser } from "@/types/user"
import { defineStore } from "pinia"
import { computed, ref } from "vue"

const API_URL = import.meta.env.VITE_API_URL

export const useAuthStore = defineStore("auth", () => {
  const user = ref<AuthenticatedUser | null>(null)

  async function login(credentials: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Login failed")
      }

      const data = await res.json()
      console.log('login data ',data)
      user.value = {
        email: data.email,
        token: data.token,
      }

      localStorage.setItem("auth", JSON.stringify(user.value))
    } catch (err) {
      throw err
    }
  }

  async function register(credentials: { email: string; password: string }) {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.message || "Registration failed")
      }
      
      const data = await res.json()
      console.log('register data ',data)
    } catch (err) {
      throw err
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem("auth")
  }

  const isAuthenticated = computed(() => !!user.value)

  function init() {
    const stored = localStorage.getItem("auth")
    if (stored) {
      user.value = JSON.parse(stored)
    }
  }

  return { user, isAuthenticated, login, register, logout, init }
})
