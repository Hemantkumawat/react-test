import * as React from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

// Note: "etsuji-react-test" is a non-existent project.
const firebaseConfig = {
  apiKey: "AIzaSyBwNZM8bGPLrfcGY0BiBUMu18BQgMRWUr0",
  authDomain: "mpr-test-a03f4.firebaseapp.com",
  projectId: "mpr-test-a03f4",
  storageBucket: "mpr-test-a03f4.appspot.com",
  messagingSenderId: "313241279867",
  appId: "1:313241279867:web:f3f59c05a682069f3931de",
  measurementId: "G-TQ7C65T6RP"
};
const clientId = '707898146815-om6sgj3i977409km4mbnk856f9fnqqdb.apps.googleusercontent.com';
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const projectId = firebaseConfig.projectId;

function LoginWithGoogle() {
  let navigate = useNavigate();

  const signInWithGoogle = () => {

    signInWithPopup(auth, provider).then((res) => {
      console.log("res", res);
      navigate("/home")
    })
      .catch((error) => { console.log(error) })
  };

  return (
    <Button variant="contained" color="info" onClick={signInWithGoogle} endIcon={<GoogleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}>
      Sign in with Google
    </Button>
  );
}
export default LoginWithGoogle;