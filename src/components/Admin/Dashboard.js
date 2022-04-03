import { Button, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { deleteQuestionDataAdmin, getDataAdmin } from '../../api/api';
import ModalAddAnswer from './ModalAddAnswer';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [dataAdmin, setDataAmin] = useState()
  const [isModalVisible,setIsModalVisible] = useState(false)
  const navigator = useNavigate()

  useEffect(() => {
    getDataAdmin().then((data)=>setDataAmin(data.data.results))
    
  })
  console.log(dataAdmin)
      
      const columns = [
        {
          title: 'question',
          dataIndex: 'question',
          key: '1',
        },
        {
          title: 'answer1',
          dataIndex: 'answer1',
          key: '2',
        },
        {
          title: 'answer2',
          dataIndex: 'answer2',
          key: '3',
        },
        {
          title: 'answer3',
          dataIndex: 'answer1',
          key: '4',
        },
        {
          title: 'answer4',
          dataIndex: 'answer2',
          key: '5',
        },
        {
          title: 'correctanswer',
          dataIndex: 'correctanswer',
          key: '6',
        },
        {
          title: 'action',
          key: '7',
          render: (text, record) => (
            <Space size="middle" key={record.id}>
              <button onClick={()=>editQuestion(record.id)}>Edit</button>
              <button onClick={()=>deleteQuestion(record.id)}>Delete</button>
            </Space>
          ),
        },
      ];
      const handleAddAnswer = () =>{
        console.log('first')
        setIsModalVisible(true)
      }
      const deleteQuestion = async(id) =>{
        console.log(id)
        try {
          await deleteQuestionDataAdmin(id)
          console.log('delete thanh cong')
        } catch (error) {
          console.log('error')
        }
      }
      const editQuestion = (id) =>{
        try {
        navigator(`/edit/${id}`)
        } catch (error) {
          console.log('error')
        }
      }
  return (
      <>

    <Button onClick={handleAddAnswer}>Add answer</Button>
    <Table dataSource={dataAdmin} columns={columns} />;
    <ModalAddAnswer isModalVisible = {isModalVisible} setIsModalVisible={setIsModalVisible}  />
      </>
  )
}

export default Dashboard