<!-- AuthForm.vue - Modern Professional Version -->
<template> 
  <div class="auth-container"> 
    <div class="auth-card"> 
      <div class="card-header">
        <h2 class="title">
          <slot name="title" />
        </h2>
        <div class="title-underline"></div>
      </div>
      
      <form @submit.prevent="$emit('submit')" class="auth-form"> 
        <slot /> 
      </form> 
    </div> 
  </div> 
</template> 

<style scoped> 
.auth-container { 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  min-height: calc(100vh - 70px);
  background: linear-gradient(135deg, #2c5364, #203a43, #0f2027); 
  padding: 1rem;
} 

.auth-card { 
  background: white; 
  padding: 2.5rem; 
  border-radius: 1.25rem; 
  box-shadow: 
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.05);
  width: 100%; 
  max-width: 420px;
  position: relative;
  overflow: hidden;
} 


.card-header {
  margin-bottom: 2rem;
  text-align: center;
}

.title { 
  color: #1a365d;
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
} 

.title-underline {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #00b4d8, #0077b6);
  margin: 0 auto;
  border-radius: 2px;
}

.auth-form { 
  display: flex; 
  flex-direction: column; 
  gap: 1rem; 
} 

/* Enhanced Input Styles */
:deep(input) { 
  padding: 0.875rem 1rem; 
  border: 2px solid #e2e8f0; 
  border-radius: 0.75rem; 
  font-size: 1rem; 
  transition: all 0.2s ease-in-out;
  background: #fafafa;
  position: relative;
} 

:deep(input:focus) { 
  border-color: #00b4d8; 
  outline: none; 
  background: white;
  box-shadow: 
    0 0 0 3px rgba(0, 180, 216, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
} 

:deep(input::placeholder) {
  color: #94a3b8;
  font-weight: 400;
}

/* Enhanced Button Styles */
:deep(button[type="submit"]) { 
  padding: 0.875rem 1.5rem; 
  border: none; 
  border-radius: 0.75rem; 
  font-size: 1rem; 
  font-weight: 600; 
  cursor: pointer; 
  transition: all 0.2s ease-in-out;
  background: linear-gradient(135deg, #2c5364, #203a43);
  color: white;
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;
} 

:deep(button[type="submit"]:hover:not(:disabled)) { 
  background: linear-gradient(135deg, #203a43, #0f2027);
  transform: translateY(-2px);
  box-shadow: 
    0 10px 20px rgba(44, 83, 100, 0.3),
    0 6px 6px rgba(44, 83, 100, 0.2);
} 

:deep(button[type="submit"]:active) {
  transform: translateY(0);
  box-shadow: 
    0 5px 10px rgba(44, 83, 100, 0.3),
    0 3px 3px rgba(44, 83, 100, 0.2);
}

:deep(button[type="submit"]:disabled) { 
  opacity: 0.6; 
  cursor: not-allowed; 
  transform: none;
  box-shadow: none;
} 

/* Loading state */
:deep(button[type="submit"]:disabled::after) {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  margin: auto;
  border: 2px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error message styling */
:deep(.error) { 
  color: #dc2626; 
  font-size: 0.875rem; 
  text-align: center;
  padding: 0.75rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  font-weight: 500;
} 

/* Responsive design */
@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
    margin: 1rem;
    border-radius: 1rem;
  }
  
  .title {
    font-size: 1.5rem;
  }
}
</style>