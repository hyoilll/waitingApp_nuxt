import { useUserStore } from '~/stores/user'

export const useLogin = () => {
  interface User {
    email: string
    password: string
  }

  const user = reactive<User>({
    email: '',
    password: ''
  })

  const loginError = ref('')
  const client = useSupabaseClient()
  const router = useRouter()
  const { setUser } = useUserStore()

  const login = async () => {
    loginError.value = ''
    const { data: authData, error: authError } = await client.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    })

    if (authError) {
      loginError.value = authError.message
      return
    }

    if (!authData.user) {
      loginError.value = 'Could not retrieve user information.'
      return
    }

    try {
      const userId = authData.user.id
      const [
        { data: userData, error: userError },
        { data: shopData, error: shopError }
      ] = await Promise.all([
        client.from('users').select('*').eq('id', userId).single(),
        client.from('shops').select('*').eq('user_id', userId).single()
      ]);

      if (userError || shopError) {
        throw userError || shopError;
      }

      if (!userData || !shopData) {
        throw new Error('User profile or shop data not found.');
      }

      setUser(userData, shopData)
      await router.push('/')

    } catch (error: any) {
      loginError.value = error.message || 'An error occurred while fetching user data.'
      await client.auth.signOut()
    }
  }

  return {
    user,
    loginError,
    login,
  }
}
