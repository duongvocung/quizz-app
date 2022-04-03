import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    createQuestionDataAdmin,
    editQuestionDataAdmin,
    getQuestionByIdDataAdmin,
} from "../../api/api";

function EditQuesAdmin() {
    const [questionById, setQuestionById] = useState({});
    const params = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        getQuestionByIdDataAdmin(params.id).then((data) =>
            setQuestionById(data)
        );
    });

    const onFinish = async (payload) => {
        console.log(payload);
        let result = {
            question: payload.question,
            answer1: payload.answer1,
            answer2: payload.answer2,
            answer3: payload.answer3,
            answer4: payload.answer4,
            correctanswer: payload.correctanswer,
        }
        try {
            await editQuestionDataAdmin(result,params.id);
            console.log("first");
            
            navigator('/admin')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {questionById.data && 
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        question: questionById.data.question,
                        answer1: questionById.data.answer1,
                        answer2: questionById.data.answer2,
                        answer3: questionById.data.answer3,
                        answer4: questionById.data.answer4,
                        correctanswer: questionById.data.correctanswer,
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
                                message: "Please input your question!",
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
                                message: "Please input your answer1!",
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
                                message: "Please input your answer2!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="answer3"
                        name="answer3"
                        rules={[
                            {
                                required: true,
                                message: "Please input your answer3!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="answer4"
                        name="answer4"
                        rules={[
                            {
                                required: true,
                                message: "Please input your answer4!",
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
                                message: "Please input your correctanswer!",
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
            }
        </>
    );  
}

export default EditQuesAdmin;
