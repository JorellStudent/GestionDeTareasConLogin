<template>
  <div class="register-form">
    <h2>Registro</h2>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Ingresa tu usuario" required>
      </div>
      <div class="form-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Ingresa tu contraseña" required>
      </div>
      <button type="submit" :disabled="isRegistering">{{ registerButtonText }}</button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isRegistering" class="registering-message">{{ registeringMessage }}</p>
      <p v-if="registerSuccess" class="success-message">Usuario registrado exitosamente.</p>
    </form>
  </div>
</template>

<script>
import api from '@/services/api'; // Ajusta la importación según la estructura de tu proyecto

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      isRegistering: false,
      registerSuccess: false,
      registeringMessage: 'Registrando usuario...'
    };
  },
  computed: {
    registerButtonText() {
      return this.isRegistering ? 'Registrando...' : 'Registrar';
    }
  },
  methods: {
    async register() {
      try {
        this.isRegistering = true; // Activa el estado de "registrando"

        const response = await api.post('/auth/register', {
          username: this.username,
          password: this.password
        });
        console.log(response.data); // Manejar la respuesta según sea necesario

        this.registerSuccess = true; // Establece el estado de registro exitoso
        this.registeringMessage = ''; // Borra el mensaje de registro

        // Redirigir al usuario a la página de inicio de sesión después de 2 segundos
        setTimeout(() => {
          this.$router.push({ name: 'Login' });
        }, 2000);

      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          this.error = error.response.data.error;
        } else {
          this.error = 'Error desconocido al registrar.';
        }
        console.error('Error de registro:', error);
      } finally {
        // Simula un tiempo de espera para mostrar el mensaje de registro
        setTimeout(() => {
          this.isRegistering = false; // Desactiva el estado de "registrando" independientemente del resultado
        }, 1500); // Ajustado para dar más tiempo para que se vea el mensaje
      }
    }
  }
};
</script>

<style scoped>
.register-form {
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
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
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
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #6c757d; /* Color gris para el botón desactivado */
}

button:hover {
  background-color: #218838;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}

.registering-message {
  text-align: center;
  margin-top: 10px;
  color: #007bff; /* Color azul para indicar la acción de registro */
}

.success-message {
  text-align: center;
  margin-top: 10px;
  color: #28a745; /* Color verde para indicar éxito */
}
</style>
