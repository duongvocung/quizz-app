import { Button, Form, Input, Modal } from 'antd'
import React from 'react'
import { createQuestionDataAdmin } from '../../api/api'

function ModalAddAnswer(props) {
    const handleCancel = () =>{
        props.setIsModalVisible(false)
    }
    const handleOk = () =>{
        props.setIsModalVisible(false)
    }
    const onFinish = async(payload) =>{
        console.log(payload)
        try {
            await createQuestionDataAdmin(payload)
            console.log('first')
            props.setIsModalVisible(false)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Modal title="Basic Modal" visible={props.isModalVisible} onOk={handleOk} onCancel={handleCancel}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="question"
        name="question"
        rules={[
          {
            required: true,
            message: 'Please input your question!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="answer1"
        name="answer1"
        rules={[
          {
            required: true,
            message: 'Please input your answer1!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="answer2"
        name="answer2"
        rules={[
          {
            required: true,
            message: 'Please input your answer2!',
          },
        ]}
      >
        <Input />
      </Form.Item><Form.Item
        label="answer3"
        name="answer3"
        rules={[
          {
            required: true,
            message: 'Please input your answer3!',
          },
        ]}
      >
        <Input />
      </Form.Item><Form.Item
        label="answer4"
        name="answer4"
        rules={[
          {
            required: true,
            message: 'Please input your answer4!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="correctanswer"
        name="correctanswer"
        rules={[
          {
            required: true,
            message: 'Please input your correctanswer!',
          },
        ]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Modal>
  )
}

export default ModalAddAnswer