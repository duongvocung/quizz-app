import { Button, Checkbox, Form, Input } from 'antd'
import axios from 'axios'
// import {} from "axios"
import React from 'react'
import { Link,NavLink,useNavigate } from 'react-router-dom'
import { authLogin } from '../api/api';

function Login() {
    let navigator = useNavigate();

    const onFinish = async(prams) => {
      const {success, data} = await authLogin(prams)
      if(success) {
        console.log(data);
        const tokens = data.tokens
        localStorage.setItem('token', tokens.access.token)
        localStorage.setItem('tokenRefresh', tokens.refresh.token)
        localStorage.setItem('expires', tokens.access.expires)
        navigator('/doquiz')
      }else{
        alert(data)
      }
    }
    const onFinishFailed = () => {}
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 8 }}
    // initialValues={{ remember: false }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

   
    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
       <div>
       <a onClick={() => {navigator('/Register')} }>Register</a>
       </div>
    </Form.Item>
   
  </Form>
  )
}

export default Login