import { Button, Radio } from "antd";
import axios from "axios";
import { result } from "lodash";
import React, { useEffect, useState } from "react";
import { getQuestionByUser, submitButton } from "../../api/api";

let answerArray = [];

function Doquiz() {
    const [questionList, setquestionList] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0)


    console.log(questionList);
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
        console.log("dap an ", e.target.value);

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
      let finalScore = 0
        try {
            let respone = await submitButton(answerArray);
            console.log(respone.data);
            console.log("success submit");
            respone.data.forEach( element => {
              if(element.result === true) {
                finalScore++
              }
            });
        } catch (error) {
            alert("aaa");
        }
        setScore(finalScore)
    };
    // const expample = () =>{
    //   let finalScore = 3
    //   return finalScore
    // }

    return (
        <>
          
            {questionList[0] && (
                <div>
                    <p> {questionList[index].question} </p>{" "}
                    <Radio.Group
                        onChange={onChange}
                        defaultValue={
                            answerArray[index] &&
                            answerArray[index].correctanswer
                        }
                        key={questionList[index].id}
                    >
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
                    </Radio.Group>{" "}
                    <Button
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
            )}{" "}
            <div>
              So diem cua m la: {score}
            </div>
            {/* <p>
              {expample()}
            </p> */}
        </>
    );
}

export default Doquiz;
