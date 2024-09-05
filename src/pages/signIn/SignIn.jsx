import React from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();

    function handleSignIn() {
        // dispatch(signIn(auth));
    }
    // TODO: implement state to track user type that is signing in to navigate to correct dashboard
    // useEffect(() => {
    //     if (data) navigate("");
    // }, [data]);
    return (
        <div>
            <p>Sign in page!</p>
            <button onClick={handleSignIn}>
                Login
            </button>
            <button onClick={() => navigate('/signUp')}>Sign Up</button>
        </div>
    );
}

export default SignIn;
