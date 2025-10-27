import { supabase } from '@/services/createClientService.ts'

export async function registerService(email: string, password: string) {
  const { data, error} = await supabase.auth.signUp({email, password})

  if (error) {
    throw error
  }

  return data
}
