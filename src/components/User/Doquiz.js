import { Button, Radio, Space } from "antd";
import axios from "axios";
import { result } from "lodash";
import React, { useEffect, useState } from "react";
import { getQuestionByUser, submitButton } from "../../api/api";
import Header from "../Header/Header";

let answerArray = [];

function Doquiz() {
    const [questionList, setquestionList] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // console.log(questionList);
    const getQuestionData = async () => {
        const { success, data } = await getQuestionByUser();
        if (success) {
            setquestionList(data.results);
        } else {
            alert(data);
        }
    };

    useEffect(() => {
        getQuestionData();
    }, []);

    const onChange = (e) => {
        // console.log("dap an ", e.target.value);

        let ansNew = {
            id: questionList[index].id,
            correctanswer: e.target.value,
        };
        let check = false;

        answerArray = answerArray.map((current, index, arr) => {
            if (current.id == ansNew.id) {
                current = ansNew;
                check = true;
            }
            return current;
        });
        if (!check) {
            answerArray.push(ansNew);
        }

        //   console.log('alo' , answerArray);
    };

    const onClickPrevious = () => {
        setIndex(index - 1);
    };
    const onClickNext = () => {
        setIndex(index + 1);
    };

    const onClickSubmit = async () => {
        let finalScore = 0;
        try {
            let respone = await submitButton(answerArray);
            // console.log(respone.data);
            // console.log("success submit");
            respone.data.forEach((element) => {
                if (element.result === true) {
                    finalScore++;
                }
            });
        } catch (error) {
            // alert("aaa");
        }
        setScore(finalScore);
        setShowResult(true);
    };

    // const expample = () =>{
    //   let finalScore = 3
    //   return finalScore
    // }

    return (
        <>
            <Header></Header>
            {questionList[0] && (
                <div style={{marginLeft:"35%"}}>
                <label >Câu hỏi {index + 1} :</label> 
                <h2 style={{display:"inline"}}>  {questionList[index].question} </h2>{" "}
                    <Radio.Group
                        onChange={onChange}
                        defaultValue={
                            answerArray[index] &&
                            answerArray[index].correctanswer
                        }
                        key={questionList[index].id}
                        style={{display:"block",marginTop:"20px"}}
                    >
                    <Space direction="vertical" size="middle" style={{ display: 'flex', marginLeft:"9%" }}>
                    <Radio value={questionList[index].answer1}>
                            {questionList[index].answer1}{" "}
                        </Radio>{" "}
                        <Radio value={questionList[index].answer2}>
                            {questionList[index].answer2}{" "}
                        </Radio>{" "}
                        <Radio value={questionList[index].answer3}>
                            {questionList[index].answer3}{" "}
                        </Radio>{" "}
                        <Radio value={questionList[index].answer4}>
                            {questionList[index].answer4}{" "}
                        </Radio>
                    </Space>
                      
                    </Radio.Group>{" "}
                    <div style={{margin:"30px 20px"}}>
                    <Button
                    style={{marginRight:"15px"}}
                        type="primary"
                        onClick={onClickPrevious}
                        disabled={index === 0 ? true : false}
                    >
                        Previous{" "}
                    </Button>
                    {!(questionList.length - 1 === index) && (
                        <Button type="primary" onClick={onClickNext}>
                            Next{" "}
                        </Button>
                    )}
                    {questionList.length - 1 === index && (
                        <Button type="primary" danger onClick={onClickSubmit}>
                            Submit{" "}
                        </Button>
                    )}{" "}
                    </div>
               
                </div>
            )}
            {showResult && <h3 style={{marginLeft:"35%", color:"red"}}>So diem cua ban la: {score}</h3>}

            {/* <p>
              {expample()}
            </p> */}
        </>
    );
}

export default Doquiz;
