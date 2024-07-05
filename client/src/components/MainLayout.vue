<template>
  <div class="main-layout">
    <header class="header">
      <nav class="nav-container">
        <ul class="nav-list">
          <li><button @click="toggleAddTask" class="nav-btn btn-add">Agregar Tarea</button></li>
          <li><button @click="toggleTaskList" class="nav-btn btn-list">Lista de Tareas</button></li>
          <li v-if="isAuthenticated"><button @click="logoutUser" class="nav-btn btn-logout">Cerrar sesión</button></li>
        </ul>
      </nav>
    </header>
    <main class="main-content">
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

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 10px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  display: flex;
}

.nav-list li {
  margin-right: 10px;
}

.nav-btn {
  padding: 12px 20px; /* Aumenta el padding para hacer los botones más grandes */
  font-size: 16px; /* Aumenta el tamaño de la fuente */
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  text-decoration: none;
}

.btn-add {
  background-color: #007bff; /* Color azul para Agregar Tarea */
}

.btn-list {
  background-color: #28a745; /* Color verde para Lista de Tareas */
}

.btn-logout {
  background-color: #dc3545; /* Color rojo para Cerrar sesión */
}

.nav-btn:hover {
  opacity: 0.8;
}

.main-content {
  flex: 1;
  padding-top: 60px; /* Ajusta el padding-top para compensar el header fijo */
}

.footer {
  background-color: #ffffff;
  color: #000000;
  text-align: center;
  padding: 10px; /* Ajusta el padding según sea necesario */
  width: 100%;
  flex-shrink: 0;
  margin-top: auto; /* Coloca el footer al final */
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
