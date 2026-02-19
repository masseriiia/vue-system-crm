import { ref } from 'vue'
import { THEME_MODE } from '@/constants/theme.ts'

export function useTheme() {
    const theme = ref(localStorage.getItem('theme-mode') || THEME_MODE.LIGHT)

    document.documentElement.classList.add(theme.value)

    function setTheme(newTheme: string) {
        document.documentElement.classList.remove(THEME_MODE.LIGHT, THEME_MODE.DARK)
        document.documentElement.classList.add(newTheme)
        localStorage.setItem('theme-mode', newTheme)
    }

    return { theme, setTheme }
}
