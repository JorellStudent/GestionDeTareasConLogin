<template>
  <div class="task-list">
    <h1>Lista de Tareas</h1>

    <!-- Botón para cargar tareas -->
    <button @click="fetchTasksFromDB" class="action-button yellow">Cargar Tareas</button>

    <!-- Controles de filtro -->
    <div class="filter-controls">
      <input type="text" v-model="filters.name" placeholder="Buscar por nombre...">
      <input type="date" v-model="filters.date" placeholder="Buscar por fecha...">
      <label>
        <input type="checkbox" v-model="filters.completed">
        Mostrar completadas
      </label>
    </div>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id" class="task-item" :class="{ 'expired-task': isTaskExpired(task) }">
        <input type="checkbox" :checked="task.completed" @change="toggleTaskCompletion(task)">
        <div v-if="!task.editMode" class="task-details">
          <span :class="{ completed: task.completed }">
            <strong>Nombre:</strong> {{ task.title }} <br>
            <strong>Descripción:</strong> {{ task.description }} <br>
            <strong>Fecha de Vencimiento:</strong> {{ formatDate(task.due_date) }}
          </span>
          <div class="task-actions">
            <button @click="editTask(task)" class="action-button green">Editar</button>
            <button @click="confirmDeleteTask(task.id)" class="action-button red">Eliminar</button>
          </div>
        </div>
        <div v-else class="edit-mode">
          <form @submit.prevent="saveTask(task)">
            <label for="edit-title">Nombre:</label>
            <input type="text" id="edit-title" v-model="task.title" required>
            <label for="edit-description">Descripción:</label>
            <textarea id="edit-description" v-model="task.description"></textarea>
            <label for="edit-due-date">Fecha de Vencimiento:</label>
            <input type="date" id="edit-due-date" v-model="task.updatedDueDate" required>
            <div class="edit-buttons">
              <button type="submit" class="action-button green">Guardar</button>
              <button @click="cancelEdit(task)" class="action-button gray">Cancelar</button>
            </div>
          </form>
        </div>
        <div v-if="isTaskExpired(task)" class="task-status">
          <strong>Tarea expirada</strong>
        </div>
        <div v-else-if="isExpiringSoon(task)" class="task-status">
          <strong>¡Advertencia!</strong> Esta tarea expira en menos de 24 horas.
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      tasks: [],
      filters: {
        name: '',
        date: '',
        completed: false
      }
    };
  },
  computed: {
    filteredTasks() {
      // Aplica los filtros
      let filtered = this.tasks.filter(task => {
        // Filtrar por nombre
        if (this.filters.name && !task.title.toLowerCase().includes(this.filters.name.toLowerCase())) {
          return false;
        }
        // Filtrar por fecha
        if (this.filters.date) {
          const taskDate = new Date(task.due_date).toISOString().split('T')[0];
          if (taskDate !== this.filters.date) {
            return false;
          }
        }
        // Filtrar por estado completado
        if (!this.filters.completed && task.completed) {
          return false;
        }
        return true;
      });
      return filtered;
    }
  },
  created() {
    this.fetchTasksFromDB();
  },
  methods: {
    async fetchTasksFromDB() {
      try {
        const response = await api.get('/tasks');
        this.tasks = response.data.map(task => ({
          ...task,
          editMode: false,
          updatedDueDate: this.formatDate(task.due_date),
          completed: false // Asegurar que los checkboxes no estén automáticamente marcados
        }));
      } catch (error) {
        this.handleError('Error al obtener tareas:', error);
      }
    },
    async deleteTask(id) {
      try {
        await api.delete(`/tasks/${id}`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        this.handleError('Error al eliminar tarea:', error);
      }
    },
    async updateTask(task) {
      try {
        await api.put(`/tasks/${task.id}`, task);
        // No actualizamos la lista aquí, pero podrías hacerlo si es necesario
      } catch (error) {
        this.handleError('Error al actualizar tarea:', error);
      }
    },
    editTask(task) {
      task.editMode = true;
    },
    cancelEdit(task) {
      task.editMode = false;
    },
    async saveTask(task) {
      try {
        const { title, description, updatedDueDate } = task;
        task.due_date = updatedDueDate;
        await api.put(`/tasks/${task.id}`, { title, description, due_date: updatedDueDate });
        task.editMode = false;
      } catch (error) {
        this.handleError('Error al guardar tarea:', error);
      }
    },
    async toggleTaskCompletion(task) {
      try {
        task.completed = !task.completed;
        await api.put(`/tasks/${task.id}`, task);
      } catch (error) {
        this.handleError('Error al actualizar estado de tarea:', error);
      }
    },
    confirmDeleteTask(id) {
      if (confirm('¿Está seguro de que desea eliminar esta tarea?')) {
        this.deleteTask(id);
      }
    },
    isExpiringSoon(task) {
      const now = new Date();
      const dueDate = new Date(task.due_date);
      const timeDifference = dueDate - now;
      return timeDifference <= 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    },
    isTaskExpired(task) {
      const now = new Date();
      const dueDate = new Date(task.due_date);
      return dueDate < now;
    },
    handleError(message, error) {
      console.error(message, error);
      alert(`${message} Por favor, inténtelo de nuevo.`);
    },
    formatDate(dateString) {
      if (!dateString) return '';
      return dateString.split('T')[0];
    }
  }
};
</script>

<style scoped>
.task-list {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.filter-controls {
  margin-bottom: 10px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.task-item .completed {
  text-decoration: line-through;
  color: #888;
}

.task-details {
  width: 70%;
}

.task-actions {
  display: flex;
  align-items: center;
}

.edit-mode {
  width: 100%;
  margin-top: 10px;
}

.edit-mode form {
  display: flex;
  flex-direction: column;
}

.edit-mode label {
  margin-top: 10px;
}

.edit-buttons {
  margin-top: 10px;
  display: flex;
}

.edit-buttons button {
  margin-right: 10px;
}

.action-button {
  padding: 8px 12px;
  border-radius: 3px;
  cursor: pointer;
  border: none;
  color: white;
  font-weight: bold;
}

.yellow {
  background-color: #ffc107; /* Color amarillo */
}

.green {
  background-color: #28a745; /* Color verde */
}

.red {
  background-color: #dc3545; /* Color rojo */
}

.gray {
  background-color: #6c757d; /* Color gris */
}

.action-button:hover {
  opacity: 0.9;
}

.action-button:active {
  opacity: 0.8;
}

.expiring-soon {
  color: red;
  font-weight: bold;
  margin-top: 10px;
}

.expired-task {
  background-color: #ffe0e0; /* Fondo rojo claro para tareas vencidas */
}

@media (max-width: 768px) {
  .task-list-container {
    width: 100%; /* Set width to 100% for smaller screens */
  }
}
</style>
