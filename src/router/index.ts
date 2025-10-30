import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { currentUserStore } from '@/stores/currentUser.ts'
import { getToken } from '@/services/tokenService.ts'
import DashboardView from '@/views/DashboardView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/auth',
    },
    {
        path: '/auth',
        name: 'Auth',
        component: AuthView,
        meta: { title: 'Авторизация' },
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView,
        meta: { title: 'Регистрация' },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { title: 'Панель управления' },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileView,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async () => {
    const store = currentUserStore()

    if (getToken()) {
        try {
            await store.fetchCurrentUser()
        } catch (error) {
            console.error('Ошибка', error)
            return { name: 'Auth' }
        }
    }
})

router.beforeEach((to) => {
    const store = currentUserStore()

    if (!store.isLoggedIn && to.name !== 'Auth' && to.name !== 'Register') {
        return { name: 'Auth' }
    }

    if (store.isLoggedIn && to.name === 'Register') {
        return { name: 'Dashboard' }
    }

    return true
})

export default router
