import { createRouter, createWebHistory } from 'vue-router'
import { currentUserStore } from '@/stores/currentUser.ts'
import { getToken } from '@/services/tokenService.ts'
import AuthView from '@/views/AuthView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ClientsView from '@/views/ClientsView.vue'
import CatalogsView from '@/views/CatalogsView.vue'
import MessagesView from '@/views/MessagesView.vue'
import SettingsView from '@/views/SettingsView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/auth',
        meta: { title: 'Профиль' },
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
        path: '/clients',
        name: 'Clients',
        component: ClientsView,
        meta: { title: 'Клиенты' },
    },
    {
        path: '/catalogs',
        name: 'Catalogs',
        component: CatalogsView,
        meta: { title: 'Каталог' },
    },
    {
        path: '/messages',
        name: 'Messages',
        component: MessagesView,
        meta: { title: 'Сообщения' },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
        meta: { title: 'Настройки' },
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

    if (store.isLoggedIn && (to.name === 'Register' || to.name === 'Auth')) {
        return { name: 'Dashboard' }
    }

    return true
})

export default router
