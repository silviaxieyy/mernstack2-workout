import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutDispatch } = useWorkoutsContext()

  const logout = () =>{
    //remove local Storage
    localStorage.removeItem('user')

    //dispatch logout user
    dispatch({type: 'LOGOUT'})
    workoutDispatch({type: 'SET_WORKOUTS', payload: null})
  }
  return { logout }
}