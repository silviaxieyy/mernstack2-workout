import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () =>{
    //remove local Storage
    localStorage.removeItem('user')

    //dispatch logout user
    dispatch({type: 'LOGOUT'})
  }
  return { logout }
}