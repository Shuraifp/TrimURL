<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

// Sample data - replace with actual API calls
const userStats = ref({
  totalUrls: 12,
  totalClicks: 2547,
  activeUrls: 10
})

const userUrls = ref([
  {
    id: 1,
    originalUrl: 'https://www.example.com/very-long-url-that-needs-shortening',
    shortUrl: 'https://trimurl.app/abc123',
    clicks: 45,
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: 2,
    originalUrl: 'https://github.com/username/awesome-project-repository',
    shortUrl: 'https://trimurl.app/xyz789',
    clicks: 123,
    createdAt: '2024-01-10',
    isActive: true
  },
  {
    id: 3,
    originalUrl: 'https://docs.google.com/document/d/very-long-document-id',
    shortUrl: 'https://trimurl.app/def456',
    clicks: 78,
    createdAt: '2024-01-08',
    isActive: false
  },
  {
    id: 4,
    originalUrl: 'https://www.another-example.com/some/long/path/to/content',
    shortUrl: 'https://trimurl.app/ghi789',
    clicks: 234,
    createdAt: '2024-01-05',
    isActive: true
  },
  {
    id: 5,
    originalUrl: 'https://stackoverflow.com/questions/12345/how-to-do-something',
    shortUrl: 'https://trimurl.app/jkl012',
    clicks: 67,
    createdAt: '2024-01-03',
    isActive: true
  },
  {
    id: 6,
    originalUrl: 'https://medium.com/@author/very-long-article-title-here',
    shortUrl: 'https://trimurl.app/mno345',
    clicks: 89,
    createdAt: '2024-01-01',
    isActive: false
  }
])

const newUrl = ref('')
const showAddForm = ref(false)

function copyToClipboard(url: string) {
  navigator.clipboard.writeText(url)
  alert('Copied to clipboard!')
}

function toggleUrlStatus(id: number) {
  const url = userUrls.value.find(u => u.id === id)
  if (url) {
    url.isActive = !url.isActive
    updateStats()
  }
}

function deleteUrl(id: number) {
  if (confirm('Are you sure you want to delete this URL?')) {
    userUrls.value = userUrls.value.filter(u => u.id !== id)
    updateStats()
  }
}

function addNewUrl() {
  if (newUrl.value.trim()) {
    const newUrlObj = {
      id: Date.now(),
      originalUrl: newUrl.value,
      shortUrl: `https://trimurl.app/${generateShortCode()}`,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true
    }
    userUrls.value.unshift(newUrlObj)
    newUrl.value = ''
    showAddForm.value = false
    updateStats()
  }
}

function generateShortCode() {
  return Math.random().toString(36).substring(2, 8)
}

function updateStats() {
  userStats.value = {
    totalUrls: userUrls.value.length,
    totalClicks: userUrls.value.reduce((sum, url) => sum + url.clicks, 0),
    activeUrls: userUrls.value.filter(url => url.isActive).length
  }
}

onMounted(() => {
  updateStats()
})
</script>

<template>
  <div class="page-wrapper">
    <!-- Header -->
    <div class="page-header">
      <div class="container">
        <h1>Dashboard</h1>
        <div class="user-info">
          <span>Welcome, {{ auth.user?.email }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="page-content">
      <div class="container">
        
        <!-- User Profile Section -->
        <div class="profile-section">
          <div class="profile-card">
            <div class="profile-avatar">
              {{ auth.user?.email?.charAt(0).toUpperCase() }}
            </div>
            <div class="profile-info">
              <h2>{{ auth.user?.email }}</h2>
              <p class="member-since">Member since January 2024</p>
            </div>
          </div>

          <!-- Statistics Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ userStats.totalUrls }}</div>
              <div class="stat-label">Total URLs</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ userStats.totalClicks }}</div>
              <div class="stat-label">Total Clicks</div>
            </div>
            <div class="stat-card">
              <div class="stat-value">{{ userStats.activeUrls }}</div>
              <div class="stat-label">Active URLs</div>
            </div>
          </div>
        </div>

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
              <input 
                v-model="newUrl" 
                type="url" 
                placeholder="Enter URL to shorten..."
                class="url-input"
                @keyup.enter="addNewUrl"
              />
              <button @click="addNewUrl" class="btn success">Create Short URL</button>
            </div>
          </div>

          <!-- URLs List -->
          <div class="urls-list">
            <div v-for="url in userUrls" :key="url.id" class="url-item">
              <div class="url-info">
                <div class="url-original">
                  <strong>Original:</strong>
                  <span :title="url.originalUrl">{{ url.originalUrl }}</span>
                </div>
                <div class="url-short">
                  <strong>Short:</strong>
                  <a :href="url.shortUrl" target="_blank">{{ url.shortUrl }}</a>
                  <button @click="copyToClipboard(url.shortUrl)" class="copy-btn">
                    📋
                  </button>
                </div>
                <div class="url-meta">
                  <span class="clicks">{{ url.clicks }} clicks</span>
                  <span class="created">Created: {{ url.createdAt }}</span>
                  <span :class="['status', url.isActive ? 'active' : 'inactive']">
                    {{ url.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
              </div>
              <div class="url-actions">
                <button 
                  @click="toggleUrlStatus(url.id)" 
                  :class="['btn', url.isActive ? 'warning' : 'success']"
                >
                  {{ url.isActive ? 'Deactivate' : 'Activate' }}
                </button>
                <button @click="deleteUrl(url.id)" class="btn danger">Delete</button>
              </div>
            </div>
          </div>

          <div v-if="userUrls.length === 0" class="empty-state">
            <p>No URLs created yet. Create your first shortened URL!</p>
            <button @click="showAddForm = true" class="btn primary">Get Started</button>
          </div>
        </div>

        <!-- Extra content to ensure scrolling -->
        <div style="height: 200px; display: flex; align-items: center; justify-content: center; color: #6c757d;">
          <p>End of dashboard content - scroll test</p>
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

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.copy-btn:hover {
  background: #f8f9fa;
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