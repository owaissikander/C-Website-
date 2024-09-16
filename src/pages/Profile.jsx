import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Avatar } from "@nextui-org/react";
import { div, h1, span } from "framer-motion/client";
import { signOut } from "firebase/auth";
import { auth } from "../utils/utils";
import { useNavigate } from "react-router";
import { Button } from "antd";


function Profile() {
    const navigate = useNavigate()

    const { user, setUser } = useContext(AuthContext)
    console.log('user======>', user);


    const handleLogOut = async () => {
        await signOut(auth)
        navigate('/')
    }
    return (
        <>
            {
                user.isLogin ?

                    <div
                        className="p-6 flex    flex-col justify-center items-center"
                    >

                        <div className="m-4 w-1/2 flex border flex-col justify-center items-center">

                            <img className="h-52   w-52" src={user.userInfo.photoUrl} />
                            <h1 className="text-4xl mb-6">{user.userInfo.name}</h1>

                            <div className="my-1   text-center m-0 p-0  text-2xl underline font-semibold">
                                {user.userInfo.email}
                            </div>
                        </div>
                    </div>
                    : <span>out</span>
            }
            <Button className="flex justify-center  text-black mx-auto py-0 rounded-lg" color="primary" size="large" onClick={handleLogOut}>
                Log Out
            </Button>



        </>

        //             <div className="w-full flex flex-col justify-center item-center ">
        //                 <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Profile page</h1>
        //                 <div className="w-full flex justify-content-center align-item-center border">


        //                     <Avatar src={user.userInfo.photoUrl} size="lg" />
        //                 </div>

        //                 <h1 className="text-1xl  mb-6 text-center  ">{user.userInfo.email}</h1>
        //                 <h1 className="text-1xl   mb-6 text-center  ">{user.userInfo.name}</h1>

        //             </div>
        //             : <h1>log out</h1>

        //     }
        //     <button
        //         onClick={handleLogOut}

        //         className="w-1/2 flex justify-center text-black font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        //     >Log Out</button>

        // </div >


    )
}
export default Profile;