import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth } from "../utils/utils";
import { useNavigate } from "react-router";



const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


const navigate = useNavigate()
  const handleSigninWithGoogle = () => {

    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result-->",result);
        
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user.photoURL;
        console.log("user==in=>", user);
navigate('/')
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage-->",errorMessage);
        
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }


  return (


    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Sign In</h1>
        <div>
          <div className="mb-4">
            <div

              className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              type="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <div className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col items-center justify-between">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Sign In
            </button>
            <button
              onClick={handleSigninWithGoogle}
              type="submit"
              className="w-full   text-orange font-bold py-2 px-4 rounded-lg hover:bg transition duration-300"
            >
              Sign In with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignIn;