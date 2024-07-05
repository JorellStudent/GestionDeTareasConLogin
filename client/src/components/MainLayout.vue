<template>
  <div class="main-layout">
    <header>
      <nav>
        <ul>
          <li><button @click="toggleAddTask" class="btn btn-primary">Agregar Tarea</button></li>
          <li><button @click="toggleTaskList" class="btn btn-primary">Lista de Tareas</button></li>
          <li v-if="isAuthenticated"><button @click="logoutUser" class="btn btn-danger">Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
    <main>
      <section v-show="showAddTask">
        <AddTask @taskAdded="refreshTaskList" />
      </section>
      <section v-show="showTaskList">
        <TaskList ref="taskList" />
      </section>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-item">
          <span>Jorell Bermejo</span><br>
          <a href="mailto:j.bermejo2@alumnos.santototmas.cl">Correo Institucional</a>
        </div>
        <div class="footer-item">
          <span>Benjamín Naveas</span><br>
          <a href="mailto:b.naveas@alumnos.santotomas.cl">Correo Institucional</a>
        </div>
        <div class="footer-item">
          <span>Nicolás Ponce</span><br>
          <a href="mailto:n.ponce19@alumnos.santotomas.cl">Correo Institucional</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AddTask from '@/components/AddTask.vue';
import TaskList from '@/components/TaskList.vue';
import api from '@/services/api';
import router from '@/router/index';

export default {
  name: 'MainLayout',
  components: {
    AddTask,
    TaskList
  },
  data() {
    return {
      isAuthenticated: !!localStorage.getItem('token'),
      showAddTask: false,
      showTaskList: true
    };
  },
  methods: {
    async logoutUser() {
      try {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
        this.isAuthenticated = false;
        router.push({ name: 'Login' });
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión. Por favor, inténtelo de nuevo.');
      }
    },
    toggleAddTask() {
      this.showAddTask = true;
      this.showTaskList = false;
    },
    toggleTaskList() {
      this.showAddTask = false;
      this.showTaskList = true;
    },
    refreshTaskList() {
      this.$refs.taskList.fetchTasks();
    }
  },
  watch: {
    isAuthenticated(newValue) {
      if (!newValue) {
        router.push({ name: 'Login' });
      }
    }
  },
  created() {
    if (!this.isAuthenticated) {
      router.push({ name: 'Login' });
    }
  }
};
</script>

<style>
.main-layout {
  position: relative;
  min-height: 100vh;
}

.header {
  background-color: #f8f8f8;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: inline;
  margin-right: 10px;
}

button {
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
}

.btn {
  background-color: #007bff; /* Color principal */
}

.btn-danger {
  background-color: #dc3545; /* Color danger (rojo) */
}

button:hover {
  opacity: 0.8;
}

.footer {
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  padding: 20px 0;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  max-width: 800px; /* Limita el ancho del contenido del footer */
  margin: 0 auto; /* Centra el contenido del footer horizontalmente */
}

.footer-item {
  flex: 1;
  padding: 10px;
}

.footer-item span {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
</style>
