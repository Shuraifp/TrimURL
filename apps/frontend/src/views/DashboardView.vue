<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useURLStore } from '@/stores/url'
import Swal from 'sweetalert2'

const auth = useAuthStore()
const url = useURLStore()

const newUrl = ref('')
const showAddForm = ref(false)

function copyToClipboard(url: string) {
  navigator.clipboard.writeText(url)
  Swal.fire({
  toast: true,
  position: 'top-end',
  icon: 'success',
  title: 'URL Copied to clipboard',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})
}

onMounted(() => {
  url.fetchUrls()
})

function shorten() {
  if (!newUrl.value.trim()) return
  url.shortenUrl(newUrl.value)
  newUrl.value = ''
  showAddForm.value = false
}

async function releaseUrl(id: string) {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to release this URL?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, release it!',
  })

  if (result.isConfirmed) {
    try {
      await url.releaseUrl(id)

      Swal.fire({
        icon: 'success',
        title: 'Released!',
        text: 'The URL was released successfully.',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to release the URL. Please try again.',
      })
    }
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="page-header">
      <div class="container">
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Welcome, {{ auth.user.email }}</span>
        </div>
      </div>
    </div>

    <div class="page-content">
      <div class="container">
        <!-- My URLs Section -->
        <div class="urls-section">
          <div class="section-header">
            <h2>My URLs</h2>
            <button @click="showAddForm = !showAddForm" class="btn primary">
              {{ showAddForm ? 'Cancel' : 'Add New URL' }}
            </button>
          </div>

          <!-- Add URL Form -->
          <div v-if="showAddForm" class="add-url-form">
            <div class="form-group">
              <input v-model="newUrl" type="url" placeholder="Enter URL to shorten..." />
              <button @click="shorten" class="btn success">Create Short URL</button>
            </div>
          </div>

          <!-- URLs List -->
          <div class="urls-list">
            <div v-for="url in url.urls" :key="url.id" class="url-item">
              <div class="url-info">
                <div class="url-original"><strong>Original:</strong> {{ url.original }}</div>
                <div class="url-short">
                  <strong>Short:</strong>
                  <a :href="`${url.shortUrl}`" target="_blank">{{ url.shortUrl }}</a>
                </div>
                <div class="url-meta">
                  <span>Created: {{ new Date(url.createdAt).toLocaleDateString() }}</span>
                </div>
                <div class="url-actions">
                  <button @click="releaseUrl(url.id)" class="btn danger">Release</button>
                  <button @click="copyToClipboard(url.shortUrl)" class="copy-btn">Copy 📋</button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="url.urls.length === 0" class="empty-state">
            <p>No URLs created yet. Create your first shortened URL!</p>
            <button @click="showAddForm = true" class="btn primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.page-wrapper {
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
}

.page-header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

.page-content {
  padding: 2rem 0 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  color: #2c5364;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6c757d;
}

.profile-section {
  margin-bottom: 3rem;
}

.profile-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00b4d8, #2c5364);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  flex-shrink: 0;
}

.profile-info h2 {
  margin: 0 0 0.5rem 0;
  color: #2c5364;
}

.member-since {
  color: #6c757d;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #00b4d8;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c5364;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #6c757d;
  font-weight: 500;
}

.urls-section {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  margin: 0;
  color: #2c5364;
}

.add-url-form {
  background: #f8f9fa;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  display: flex;
  gap: 1rem;
}

.url-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.url-input:focus {
  outline: none;
  border-color: #00b4d8;
}

.urls-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.url-item {
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.url-info {
  flex: 1;
}

.url-original,
.url-short {
  margin-bottom: 0.5rem;
  color: #343a40;
}

.url-original span,
.url-short a {
  margin-left: 0.5rem;
  word-break: break-all;
}

.url-short {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.url-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.copy-btn {
  background: #a17f1d;
  border: none;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.95rem;
  color: white;
}

.copy-btn:hover {
  background: #7a6114;
}

.url-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #6c757d;
  flex-wrap: wrap;
}

.status.active {
  color: #28a745;
}

.status.inactive {
  color: #dc3545;
}

.url-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.empty-state {
  text-align: center;
  padding: 3rem 0;
  color: #6c757d;
}

.empty-state .btn {
  margin-top: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn.primary {
  background: #00b4d8;
  color: white;
}

.btn.success {
  background: #28a745;
  color: white;
}

.btn.warning {
  background: #ffc107;
  color: #212529;
}

.btn.danger {
  background: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .page-header .container {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .profile-card {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .form-group {
    flex-direction: column;
  }

  .url-item {
    flex-direction: column;
  }

  .url-actions {
    align-self: stretch;
  }

  .url-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .url-short {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
