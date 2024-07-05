<template>
  <div class="login-form">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Nombre de usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Ingresa tu nombre de usuario" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required>
        <!-- Mensaje de error -->
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
    <p>¿No estás registrado? <router-link to="/register">Regístrate aquí</router-link></p>
  </div>
</template>

<script>
import router from '@/router/index'; // Importa la instancia de Vue Router
import api from '@/services/api'; // Importa el servicio API

export default {
  data() {
    return {
      username: '',
      password: '',
      loginError: '' // Nuevo estado para el mensaje de error
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password
        });
        
        // Guarda el token en localStorage
        localStorage.setItem('token', response.data.token);

        // Determina a dónde redirigir al usuario después de iniciar sesión
        this.redirectToMainLayout();

      } catch (error) {
        console.error('Error en inicio de sesión:', error.response.data.error);
        this.loginError = 'Nombre de usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.';
      }
    },
    redirectToMainLayout() {
      // Redirige al usuario según la lógica deseada
      const routeName = localStorage.getItem('redirectRoute') || 'AddTask'; // Default to AddTask
      router.push({ name: routeName });
      localStorage.removeItem('redirectRoute'); // Limpiar la ruta de redirección almacenada
    }
  }
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="password"],
button {
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box; /* Para incluir el padding en el ancho total */
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 5px;
}

p {
  text-align: center;
  margin-top: 15px;
}
</style>
