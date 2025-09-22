<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <main class="not-found">
    <div class="content">
      <div class="error-code">404</div>
      <h1>Page Not Found</h1>
      <p>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <div class="actions">
        <button @click="goHome" class="btn primary">Go Home</button>
        <button @click="goBack" class="btn secondary">Go Back</button>
      </div>
    </div>
    <div class="illustration">
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="150" r="100" stroke="#00b4d8" stroke-width="3" fill="none" opacity="0.3"/>
        <circle cx="120" cy="120" r="8" fill="#00b4d8"/>
        <circle cx="180" cy="120" r="8" fill="#00b4d8"/>
        <path d="M 120 180 Q 150 200 180 180" stroke="#00b4d8" stroke-width="3" fill="none"/>
        <text x="150" y="250" text-anchor="middle" fill="#00b4d8" font-size="20" font-weight="bold">Lost Link</text>
      </svg>
    </div>
  </main>
</template>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f2027, #2c5364, #00b4d8);
  color: white;
  padding: 2rem;
  gap: 4rem;
}

.content {
  text-align: center;
  max-width: 500px;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #00b4d8;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
}

.content h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.illustration {
  animation: float 3s ease-in-out infinite;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn.primary {
  background: #00b4d8;
  color: white;
}

.btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn.primary:hover {
  background: #0096b8;
}

.btn.secondary:hover {
  background: white;
  color: #2c5364;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .not-found {
    flex-direction: column;
    gap: 2rem;
  }
  
  .error-code {
    font-size: 6rem;
  }
  
  .content h1 {
    font-size: 2rem;
  }
  
  .actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 200px;
  }
  
  .illustration svg {
    width: 200px;
    height: 200px;
  }
}
</style>