import {useEffect, useState} from "react";
import surveyData from "../assets/survey.json"

const Survey = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyImage, setSurveyImage] = useState('');

    useEffect(() => {
        setSurveyTitle(surveyData.title);
        setSurveyImage(surveyData.image);0
    }, []);

    const handleStartSurveyClick = () => {
        console.log("Starting survey...");
    };

    return (
        <div>
            <h1>{surveyTitle}</h1>
            <img src={surveyImage} alt="Survey" />

            <button onClick={handleStartSurveyClick}>Start Answering</button>
        </div>
    )
}

export default Survey;
