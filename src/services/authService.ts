import { supabase } from '@/services/createClientService.ts'
import { setRefreshToken, setToken } from '@/services/tokenService.ts'

export async function loginService(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    throw error
  }

  setToken(data.session)
  setRefreshToken(data.session)
}
