import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/app/stores/useUserStore.ts'
import { getToken, getRefreshToken } from '@/modules/auth/api/tokenService.ts'
import { ROUTE_NAMES, ROUTE_PATHS } from '@/app/constants/routes.ts'

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
        component: () => import('@/pages/AuthPage/AuthPage.vue'),
        meta: { title: 'Авторизация' },
    },
    {
        path: ROUTE_PATHS.REGISTER,
        name: ROUTE_NAMES.REGISTER,
        component: () => import('@/pages/RegisterPage/RegisterPage.vue'),
        meta: { title: 'Регистрация' },
    },
    {
        path: ROUTE_PATHS.DASHBOARD,
        name: ROUTE_NAMES.DASHBOARD,
        component: () => import('@/pages/DashboardPage/DashboardPage.vue'),
        meta: { title: 'Панель управления' },
    },
    {
        path: ROUTE_PATHS.CLIENTS,
        name: ROUTE_NAMES.CLIENTS,
        component: () => import('@/pages/ClientsPage/ClientsPage.vue'),
        meta: { title: 'Клиенты' },
    },
    {
        path: ROUTE_PATHS.CATALOGS,
        name: ROUTE_NAMES.CATALOGS,
        component: () => import('@/pages/CatalogsPage/CatalogsPage.vue'),
        meta: { title: 'Каталог' },
    },
    {
        path: ROUTE_PATHS.MESSAGES,
        name: ROUTE_NAMES.MESSAGES,
        component: () => import('@/pages/MessagesPage/MessagesPage.vue'),
        meta: { title: 'Сообщения' },
    },
    {
        path: ROUTE_PATHS.SETTINGS,
        name: ROUTE_NAMES.SETTINGS,
        component: () => import('@/pages/SettingsPage/SettingsPage.vue'),
        meta: { title: 'Настройки' },
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    const userStore = useUserStore()

    if (getToken() || getRefreshToken()) {
        try {
            await userStore.fetchCurrentUser()
        } catch (error) {
            console.error('Ошибка', error)
            return { name: ROUTE_NAMES.AUTH }
        }
    }

    if (!userStore.isLoggedIn && to.name !== ROUTE_NAMES.AUTH && to.name !== ROUTE_NAMES.REGISTER) {
        return { name: ROUTE_NAMES.AUTH }
    }

    if (userStore.isLoggedIn && (to.name === ROUTE_NAMES.REGISTER || to.name === ROUTE_NAMES.AUTH)) {
        return { name: ROUTE_NAMES.DASHBOARD }
    }

    return true
})

export default router
