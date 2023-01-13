import { Box } from "components/box/Box";
import { FeedbackOptions } from "./FeedbackOptions";
import { Statistics } from "components/statistics/Statistics";
import styled from "styled-components";
import { Notification } from "components/statistics/Notification";
// import {  Component  } from "react";
import { useState } from "react";

const TitleH2 = styled.h2`
  /* width: 50%; */
  text-align: center;
  border-radius: ${p=>p.theme.radii.normal};
  background-color: ${p=>p.theme.colors.accent};
  margin: ${p=>p.theme.space[0]}px auto;
  padding: ${p=>p.theme.space[2]}px;
  margin-top: ${p=>p.theme.space[5]}px; 
  font-weight: ${p=>p.theme.fontWeights.heading};
  font-family: ${p=>p.theme.fonts.heading};
`

export const Feedback = () => {
    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad:0
    })

    const {good, neutral, bad} = state;

    const handleLeaveFeedback = (e) => {
    const buttonName = e.target.name.toLowerCase();

    setState((prev)=>({...prev, [buttonName]: prev[buttonName] + 1}))
}

    const countTotalFeedback = () => {
        return Object.values(state).reduce((acc,state)=>{
            return acc += state;
        },0);
    }

    const countPositivePercentage = () => {
        return good/countTotalFeedback()*100;
    }

return (
        <>
            <Box as={"section"}>
                <TitleH2>Please leave feedback</TitleH2>
                <FeedbackOptions options={['Good', 'Neutral', 'Bad']} onLeaveFeedback={handleLeaveFeedback}></FeedbackOptions>
            </Box>
            <Box as={"section"}>
                <TitleH2>Statistics</TitleH2>
                {countTotalFeedback() > 0 ? 
                <Statistics good={good} neutral={neutral} bad={bad} total={countTotalFeedback()} positivePercentage={countPositivePercentage()}></Statistics> 
                : <Box mt="7" mb="7" as={"section"}>
                <Notification message="There is no feedback"></Notification>
                </Box>}
            </Box>
        </>
        )
}

// ============================
// Class Component
// export class Feedback extends Component {
//     state = {
//         good: 0,
//         neutral: 0,
//         bad: 0,
//     }

//     handleLeaveFeedback = (e) => {
//         const buttonName = e.target.name.toLowerCase();

//         this.setState((prevState)=>{
//             return {
//                 [buttonName]: prevState[buttonName] += 1
//             }
//         })
//     }

//     countTotalFeedback = () => {
//         return Object.values(this.state).reduce((acc,state)=>{
//             return acc += state;
//         },0);
//     }

//     countPositivePercentage = () => {
//         const {good} = this.state;
//         return good/this.countTotalFeedback()*100;
//     }

//     render() {
//         const { good, neutral, bad } = this.state;

//         return (
//             <>
//                 <Box as={"section"}>
//                     <TitleH2>Please leave feedback</TitleH2>
//                     <FeedbackOptions options={['Good', 'Neutral', 'Bad']} onLeaveFeedback={this.handleLeaveFeedback}></FeedbackOptions>
//                 </Box>
//                 <Box as={"section"}>
//                     <TitleH2>Statistics</TitleH2>
//                     {this.countTotalFeedback() > 0 ? <Statistics good={good} neutral={neutral} bad={bad} total={this.countTotalFeedback()} positivePercentage={this.countPositivePercentage()}></Statistics> : <Box mt="7" mb="7" as={"section"}><Notification message="There is no feedback"></Notification></Box>}
//                 </Box>
//             </>
//         )
//     }