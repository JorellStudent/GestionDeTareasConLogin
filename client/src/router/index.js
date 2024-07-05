import Vue from 'vue';
import VueRouter from 'vue-router';
import AddTask from '@/components/AddTask.vue';
import TaskList from '@/components/TaskList.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import MainLayout from '@/components/MainLayout.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginForm, name: 'Login' },
  { path: '/register', component: RegisterForm, name: 'Register' },
  { 
    path: '/main',
    component: MainLayout,
    children: [
      { path: 'add-task', component: AddTask, name: 'AddTask', meta: { requiresAuth: true } },
      { path: 'task-list', component: TaskList, name: 'TaskList', meta: { requiresAuth: true } },
      { path: '', redirect: 'add-task' } // Redirige al agregar tarea por defecto al acceder a /main/
    ],
    meta: { requiresAuth: true } // Asegúrate de que MainLayout también requiera autenticación
  },
  { path: '*', redirect: '/' } // Redirige cualquier otra ruta no definida al formulario de inicio de sesión
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
    if (!isAuthenticated) {
      next({ name: 'Login' });
    } else {
      next(); // Permitir la navegación
    }
  } else {
    next(); // Permitir la navegación normal para rutas que no requieren autenticación
  }
});

export default router;
