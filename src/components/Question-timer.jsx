import { useEffect ,useState} from "react";

function QuestionTimer({timeOut , onTimeout}){

    const [remainingTime, SetremainingTime] = useState(timeOut)

    useEffect(()=>{
        const timer = setTimeout(onTimeout,timeOut);

        return ()=>{
            clearTimeout(timer);
        };
    },[timeOut,onTimeout]);

    useEffect(()=>{

        const interval = setInterval(()=>{
            SetremainingTime((prevremainingTime)=> prevremainingTime - 100) //this make the time decreased by one 
        },100);

        return ()=>{
            clearInterval(interval);
        };
    },[])

    
    return(
        <progress id="question-time" max={timeOut} value={remainingTime}></progress>
    )

}

export default QuestionTimer;