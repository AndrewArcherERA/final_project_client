import React from 'react'
import { useNavigate } from 'react-router-dom'; 
function SignUp() {
  const navigate = useNavigate();
  return (
    <div>
      <p>Sign up page!</p>

      <button onClick={() => navigate('/')}>Submit form</button>
    </div>
  )
}

export default SignUp
