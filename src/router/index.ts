import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'
import { getToken } from '@/services/tokenService.ts'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/constants/routes.ts'

const routes = [
    {
        path: '/',
        name: ROUTE_NAMES.HOME,
        redirect: '/auth',
        meta: { title: 'Профиль' },
    },
    {
        path: ROUTE_PATHS.AUTH,
        name: ROUTE_NAMES.AUTH,
        component: () => import('@/views/AuthView.vue'),
        meta: { title: 'Авторизация' },
    },
    {
        path: ROUTE_PATHS.REGISTER,
        name: ROUTE_NAMES.REGISTER,
        component: () => import('@/views/RegisterView.vue'),
        meta: { title: 'Регистрация' },
    },
    {
        path: ROUTE_PATHS.DASHBOARD,
        name: ROUTE_NAMES.DASHBOARD,
        component: () => import('@/views/DashboardView.vue'),
        meta: { title: 'Панель управления' },
    },
    {
        path: ROUTE_PATHS.CLIENTS,
        name: ROUTE_NAMES.CLIENTS,
        component: () => import('@/views/ClientsView.vue'),
        meta: { title: 'Клиенты' },
    },
    {
        path: ROUTE_PATHS.CATALOGS,
        name: ROUTE_NAMES.CATALOGS,
        component: () => import('@/views/CatalogsView.vue'),
        meta: { title: 'Каталог' },
    },
    {
        path: ROUTE_PATHS.MESSAGES,
        name: ROUTE_NAMES.MESSAGES,
        component: () => import('@/views/MessagesView.vue'),
        meta: { title: 'Сообщения' },
    },
    {
        path: ROUTE_PATHS.SETTINGS,
        name: ROUTE_NAMES.SETTINGS,
        component: () => import('@/views/SettingsView.vue'),
        meta: { title: 'Настройки' },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async () => {
    const store = useUserStore()

    if (getToken()) {
        try {
            await store.fetchCurrentUser()
        } catch (error) {
            console.error('Ошибка', error)
            return { name: ROUTE_NAMES.AUTH }
        }
    }
})

router.beforeEach((to) => {
    const store = useUserStore()

    if (!store.isLoggedIn && to.name !== ROUTE_NAMES.AUTH && to.name !== ROUTE_NAMES.REGISTER) {
        return { name: ROUTE_NAMES.AUTH }
    }

    if (store.isLoggedIn && (to.name === ROUTE_NAMES.REGISTER || to.name === ROUTE_NAMES.AUTH)) {
        return { name: ROUTE_NAMES.DASHBOARD }
    }

    return true
})

export default router
