import { useState , useCallback} from "react";
import questions from "../questions";
import Summary from "./Summary";
import QuestionTimer from "./Question-timer";

function Quiz(){

    const [userAnsewrs , SetuserAnswers] = useState([]);

    const activeQuestionIndex = userAnsewrs.length;
    const quizCompleted = activeQuestionIndex === questions.length

    const handelAnswer = useCallback(function handelAnswer(selectedAnswer){
        SetuserAnswers(prevAnswers=>{
            return [...prevAnswers, selectedAnswer]
        })
    },[])

    const handelSkipAnswer = useCallback(()=>handelAnswer(null),[handelAnswer]); //this means that when the time expired we need to run the function handelanswer to go to the next question but we send null instead of answer(this incase that the time expired before he choose one)

    if(quizCompleted){
        return (
            <Summary userAnswers={userAnsewrs}></Summary>
        )
    }

    const ShuffeldAnswers = [...questions[activeQuestionIndex].answers];
    ShuffeldAnswers.sort(()=>Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="questions">
                <QuestionTimer 
                    timeOut={10000}
                    onTimeout={handelSkipAnswer}
                    key={activeQuestionIndex}//we do this as when the next quetion com the timer didnt start so we need to pass key with value that change so when it change the react destroy the component instances and recreate it so the time restart 
                ></QuestionTimer>
                <h2>{questions[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {ShuffeldAnswers.map(answer=>(
                        <li key={answer} className="answer">
                            <button onClick={()=>handelAnswer(answer)}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default Quiz;;