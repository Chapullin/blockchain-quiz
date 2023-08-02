import {useEffect, useState} from "react";
import surveyData from "../assets/survey.json"
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import AnswerStore from '../store/AnswerStore';

const START_INDEX = 0;

const Survey = () => {
    const [surveyTitle, setSurveyTitle] = useState('');
    const [surveyImage, setSurveyImage] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex]
        = useState(START_INDEX);
    const [remainingSeconds, setRemainingSeconds]
        = useState(surveyData.questions[START_INDEX].lifetimeSeconds);
    const [isAnswering, setIsAnswering] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');

    // Loading Title and Image
    useEffect(() => {
        setSurveyTitle(surveyData.title);
        setSurveyImage(surveyData.image);
    }, []);

    useEffect(() => {
        console.log('currentQuestionIndex === \x1b[0m', currentQuestionIndex);
    }, [currentQuestionIndex])

    const handleNextQuestion = () => {
        setIsAnswering(false);

        // Storing the answer
        const answer = {
            question: currentQuestion.text,
            option: selectedOption,
        };
        AnswerStore.addAnswer(answer);
        //Printing the answers
        const plainAnswers: object = toJS(AnswerStore.answers);
        console.log('\x1b[42m AnswerStore.answers === \x1b[0m', plainAnswers);

        // Checking the question index
        if (currentQuestionIndex < surveyData.questions.length - 1) {
            setRemainingSeconds(
                surveyData.questions[currentQuestionIndex + 1].lifetimeSeconds
            );
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsAnswering(true)
            setSelectedOption('')
        } else {
            setIsFinished(true);
            console.log("Survey completed!");
        }
    };

    useEffect(() => {
        setSelectedOption('');
    }, [currentQuestionIndex]);

    // Start answering
    useEffect(() => {
        let timer;
        if (isAnswering && remainingSeconds > 0) {
            timer = setInterval(() => {
                setRemainingSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (remainingSeconds === 0) {
            console.log('executing handleNextQuestion === \x1b[0m');
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
        setSelectedOption(event.target.value);
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
                                checked={selectedOption === option.text}
                            />
                            <label
                                htmlFor={`option-${index}`}
                            >
                                {option.text}
                            </label>
                        </div>
                    ))}
                    <button onClick={handleNextQuestion}>
                        Next Question
                    </button>
                </div>
            ) : isFinished ? (
                <p>Survey Finished</p>
                ) : (
                    <>
                        <br/>
                        <button onClick={handleStartSurvey}>
                            Start Answering
                        </button>
                    </>
            )}

        </div>
    )
}

export default observer(Survey);
