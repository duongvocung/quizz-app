import { Button, Checkbox, Form, Input, message } from 'antd'
import axios from 'axios'
import React from 'react'
import _ from 'lodash';
import { Link, useNavigate  } from "react-router-dom";
import { authRegister } from '../api/api';




function Register() {

  let navigator  = useNavigate();

    const onFinish = async(payload) => {
        const params = _.pick(payload, ['username', 'password','email']);
        await authRegister(params)
        console.log(params);
        navigator('/')
    }
    const onFinishFailed = () => {}
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
    //   initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{marginTop:"50px",}}
    >
      <h2 style={{marginLeft:"33%"}}>Register</h2>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

        
      <Form.Item 
        
        name='email' label="Email" rules={[{ type: 'email' }]}>
        <Input />
      </Form.Item>  

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
              pattern: new RegExp('^(?=.*[a-z])(?=.*[0-9](?=.{8,}))'),
              message:' Password must be at least one letter, one number and greater than 8 characters '
          }
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      <div>
       <a onClick={() => {navigator('/')} }>Login</a>
       </div>
      </Form.Item>
    </Form>
  )
}

export default Register