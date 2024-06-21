import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null)
    
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,password})
      })
  
      const result = await response.json()
      console.log(result)

      if (!response.ok) {
        setIsLoading(false)
        setError(result.error)
      }
  
      if (response.ok) {
        //save the user to local storage
        console.log(JSON.stringify(result))
        localStorage.setItem('user', JSON.stringify(result))
  
        //update the auth context
        dispatch({type: 'LOGIN', payload: result})
  
        setIsLoading(false)
      }
    } catch (error) {
        setIsLoading(false)
        setError('An error occurred. Please try again.')
    }
  }

  return { signup, isLoading, error}
}