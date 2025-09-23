import type { URLListResponseDto } from '@/types/url'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'
import Swal from 'sweetalert2'

const API_URL = import.meta.env.VITE_API_URL

export const useURLStore = defineStore('url', () => {
  const auth = useAuthStore()
  const urls = ref<URLListResponseDto[]>([])

  async function fetchUrls() {
    if (!auth.user) return
    try {
      console.log('api url in fetch: ', API_URL)
      const res = await fetch(`${API_URL}/url/my/list`, {
        headers: { Authorization: `Bearer ${auth.user.token}` },
      })
      if (!res.ok) throw new Error('Failed to fetch URLs')
      urls.value = await res.json()
    } catch (err: any) {
      console.error(err)
    }
  }

  async function shortenUrl(original: string) {
    if (!auth.user) return
    try {
      const res = await fetch(`${API_URL}/url/shorten`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.user.token}`,
        },
        body: JSON.stringify({ original }),
      })

      if (!res.ok) throw new Error('Failed to shorten URL')
      const data = await res.json()
      urls.value.unshift({
        id: data.id,
        original: data.original,
        shortUrl: data.shortUrl,
        createdAt: data.createdAt,
        userId: data.userId,
      })
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'URL Shortened Successfully',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      })
    } catch (err: any) {
      console.error(err)
    }
  }

  async function releaseUrl(id: string) {
    if (!auth.user) return
    try {
      const res = await fetch(`${API_URL}/url/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.user.token}` },
      })
      if (!res.ok) throw new Error('Failed to release URL')

      urls.value = urls.value.filter((url) => url.id !== id)
    } catch (err: any) {
      console.error(err)
      throw err
    }
  }

  return { urls, fetchUrls, shortenUrl, releaseUrl }
})
