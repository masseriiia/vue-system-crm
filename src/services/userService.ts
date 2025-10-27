import { getToken } from '@/services/tokenService.ts'
import { supabase } from '@/services/createClientService.ts'

export function getCurrentUserData() {
  const token = getToken()

  if (!token) {
    console.error('Токен не найден')
    return null
  }

  return supabase.auth.getUser(token)
}
