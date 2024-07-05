<template>
  <div class="add-task">
    <h1>Agregar Tarea</h1>
    <form @submit.prevent="addTask">
      <div class="form-group">
        <label for="title">Título:</label>
        <input type="text" id="title" v-model.trim="title" placeholder="Ingrese el título de la tarea" required />
      </div>
      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model.trim="description" placeholder="Ingrese la descripción de la tarea" required></textarea>
      </div>
      <div class="form-group">
        <label for="due_date">Fecha de Vencimiento:</label>
        <input type="date" id="due_date" v-model="due_date" required />
        <!-- Muestra la fecha formateada para verificar -->
        <p v-if="due_date">{{ formattedDueDate }}</p>
      </div>
      <button type="submit" :disabled="isAddingTask">Agregar Tarea</button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p v-if="isAddingTask">Registrando tarea...</p>
      <p v-if="taskAddedSuccessfully" class="success-message">Tarea registrada exitosamente.</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api';
import { format } from 'date-fns'; // Importa la función format desde date-fns

export default {
  data() {
    return {
      title: '',
      description: '',
      due_date: '',
      error: '',
      isAddingTask: false,
      taskAddedSuccessfully: false
    };
  },
  computed: {
    formattedDueDate() {
      return this.due_date ? format(new Date(this.due_date), 'dd/MM/yyyy') : '';
    }
  },
  methods: {
    async addTask() {
      this.isAddingTask = true;
      this.error = '';

      try {
        const response = await api.post('/tasks', {
          title: this.title,
          description: this.description,
          due_date: this.due_date,
          completed: false, // Asegura que la tarea se cree como no completada
          user_id: 1 // Ajusta esto según la lógica de autenticación de tu aplicación
        });
        
        if (response.status === 201) {
          this.title = '';
          this.description = '';
          this.due_date = '';
          this.taskAddedSuccessfully = true; // Mostrar mensaje de éxito
          setTimeout(() => {
            this.taskAddedSuccessfully = false; // Ocultar mensaje después de un tiempo
          }, 3000); // Ocultar después de 3 segundos (opcional)
          // this.$router.push({ name: 'TaskList' }); // Redirige a la lista de tareas
        } else {
          throw new Error('No se pudo agregar la tarea. Estado de respuesta inesperado.');
        }
      } catch (error) {
        console.error('Error adding task:', error);
        if (error.response && error.response.data && error.response.data.error) {
          this.error = error.response.data.error;
        } else {
          this.error = 'Hubo un error al agregar la tarea. Inténtalo de nuevo.';
        }
      } finally {
        this.isAddingTask = false;
      }
    }
  }
};
</script>

<style scoped>
.add-task {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="date"],
textarea,
button {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: calc(100% - 22px); /* 22px es el ancho del padding + borde */
  box-sizing: border-box;
  margin-bottom: 10px;
}

textarea {
  resize: vertical;
}

button {
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #6c757d;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}

.success-message {
  color: #28a745;
  margin-top: 10px;
}
</style>
