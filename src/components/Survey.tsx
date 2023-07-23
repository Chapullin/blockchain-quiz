import {useEffect, useState} from "react";
import surveyData from "../assets/survey.json"

const START_INDEX = 0;

const Survey = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyImage, setSurveyImage] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(START_INDEX);
    console.log('\x1b[42m currentQuestionIndex === \x1b[0m', currentQuestionIndex);
    const [remainingSeconds, setRemainingSeconds] = useState(surveyData.questions[START_INDEX].lifetimeSeconds);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Loading Title and Image
    useEffect(() => {
        setSurveyTitle(surveyData.title);
        setSurveyImage(surveyData.image);0
    }, []);

    const handleNextQuestion = () => {
        setIsAnswering(false);
        console.log('\x1b[42m currentQuestionIndex === \x1b[0m', currentQuestionIndex);
        if (currentQuestionIndex < surveyData.questions.length - 1) {
            console.log('\x1b[42m INSIDE IF currentQuestionIndex === \x1b[0m', currentQuestionIndex);
            setRemainingSeconds(surveyData.questions[currentQuestionIndex + 1].lifetimeSeconds);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswering(true)
        } else {
            setIsFinished(true);
            console.log("Survey completed!");
            // Add logic for survey completion
        }
    };

    // Start answering
    useEffect(() => {
        let timer;
        if (isAnswering && remainingSeconds > 0) {
            timer = setInterval(() => {
                setRemainingSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (remainingSeconds === 0) {
            console.log('\x1b[42m executing handleNextQuestion === \x1b[0m');
            handleNextQuestion();
        }

        return () => clearInterval(timer);
    }, [isAnswering, remainingSeconds]);

    const handleStartSurvey = () => {
        setIsAnswering(true);
        setCurrentQuestionIndex(0);
        setRemainingSeconds(surveyData.questions[0].lifetimeSeconds);
    };

    const currentQuestion = surveyData.questions[currentQuestionIndex];

    const handleOptionChange = (event) => {
        // Add logic to handle the user's selection
        console.log("Selected option:", event.target.value);
    };

    return (
        <div>
            <h1>{surveyTitle}</h1>
            <img src={surveyImage} alt="Survey" />

            {isAnswering ? (
                // Display the current question while answering
                <div>
                    <h2>{currentQuestion.text}</h2>
                    <p>Remaining Time: {remainingSeconds} seconds</p>
                    {currentQuestion.options.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="question-options"
                                value={option.text}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={`option-${index}`}>{option.text}</label>
                        </div>
                    ))}
                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            ) : isFinished ? (
                <p>Survey Finished</p>
                ) : (
                <button onClick={handleStartSurvey}>Start Answering</button>
            )}
        </div>
    )
}

export default Survey;
