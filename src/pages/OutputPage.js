// OutputPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../pages-css/OutputPage.css'; // Adjust the import path as per your project structure

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";

const OutputPage = ({ messages }) => {
  const location = useLocation();
  const { state } = location;

  const [summary, setSummary] = useState({ date: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const userMessages = state.messages.filter((message) => message.role !== 'system');

        const response = await axios.post(
          API_URL,
          {
            model: 'gpt-3.5-turbo',
            messages: [
              ...userMessages,
              {
                role: 'user',
                content: `ChatGPT, you are now in the analysis phase of this legal consultation under Philippine Jurisdiction. Focus on Philippine Law. 
                Your role is to review and comprehend all the information shared by the client during the previous interactions. 
                Here are the key steps you should follow:
                Summarize the Situation: Start by providing a brief, understandable summary of the client's situation. 
                This summary should not include any legal interpretations yet. It should simply reflect the facts and details shared by the client to ensure that you have correctly understood their circumstances.
                Legal Analysis: Next, perform a legal analysis of the client's situation based on the information they provided. 
                Use precise and accurate legal terms to explain the potential legal implications, rights, responsibilities, and potential legal avenues available to the client. 
                This analysis should be based on the legal norms, precedents, and regulations that apply to the case. 
                Make sure to explain these terms in a way that is comprehensible to a layperson.
                Course of Action: Finally, provide a list of possible actions the client could take to address their situation. 
                This should be based on the legal analysis you've done and should consider the client's specific needs and circumstances. 
                Discuss the potential benefits, risks, and consequences of each option, and remind the client that your suggestions are not definitive legal advice and should be reviewed with a qualified legal professional.
                Remember to communicate empathetically and professionally throughout this process. Your goal is to help the client understand their situation better and guide them towards possible next steps.`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedSummary = {
          date: new Date().toISOString(),
          content: response.data.choices[0].message.content.trim(),
        };
        setSummary(fetchedSummary);
        setLoading(false);
      } catch (error) {
        console.error('Error response from OpenAI:', error.response?.data);
        setLoading(false);
      }
    };

    if (state && state.messages) getSummary();
  }, [state]);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="outputBox">
          <p className="summaryText">{summary.content}</p>
          {/* Conditionally render the "Done" button */}
          {summary.content && (
            <Link to="/">
              <button className="doneButton">Done</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
  
};

export default OutputPage;
