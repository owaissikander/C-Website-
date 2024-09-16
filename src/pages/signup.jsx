import {  createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {  getDownloadURL, uploadBytes,ref } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Button, Checkbox, Form, Input } from 'antd';
import { InboxOutlined } from "@ant-design/icons";
import { auth, db, storage } from "../utils/utils";
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { useNavigate } from "react-router";
import { message } from "antd";
function  SignUp() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()



  const onFinish = async (values) => {
    console.log("File:", values.dragger[0].originFileObj);
    console.log("values:----->", values);


    try {
      const signUpUser =await createUserWithEmailAndPassword(auth, values.email, values.password)
      console.log('sign up done');
      const storageRef =  ref(storage, 'user/')
      const uploadname = await uploadBytes(storageRef, values.dragger[0].originFileObj)
      console.log("image upload hogaye han---->",);


      const url =await getDownloadURL(storageRef,)
      console.log("url aa gaye han");

      const info = {
        email: values.email,
        name: values.username,
        photoUrl: values.photoURL,
      };

      const dbRef =  doc(db, 'user/', signUpUser.user.uid)
      setDoc(dbRef, info);
      console.log("db mai data chala gaye...");
      message.success("User Registered Successfully");
      navigate('/')


    } catch (err) {
      console.log(err);
      message.error("Kuch Galat hogya , Aap khud search krlo");
      setLoading(false)
    }
  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleSignUpwithGoole = () => {


    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user=>", user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage-->", errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });


  }


  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Sign Up
        </h1>
        <div>
          {/* <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="text"

            >
              User Name
            </label>
            <input

              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"

            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input

              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div> */}

          {/* <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign Up
            </button>
          </div> */}


          <Form
            name="basic"
            labelCol={{
              span: 16,
            }}
            layout="vertical"
            wrapperCol={{
              span: 16,
            }}
            style={{
              Width: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"

              rules={[
                {

                  required: true,

                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please enter your email!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />

            </Form.Item>

            <Form.Item label="Dragger">
              <Form.Item
                name="dragger"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                noStyle
              >
                <Upload.Dragger name="files">
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload.
                  </p>
                </Upload.Dragger>
              </Form.Item>
              {/* <input name="imageUrl" type="file" /> */}

              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>


          <div className="flex items-center justify-between">
            <button
              onClick={handleSignUpwithGoole}
              className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg  transition duration-300"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
export default SignUp;