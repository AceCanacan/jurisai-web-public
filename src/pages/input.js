import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Input.css';

function CustomButton({ title, onPress, style }) {
  return (
    <button onClick={onPress} className={`buttonContainer ${style}`}>
      {title}
    </button>
  );
}

function InputPage() {
  const [situation, setSituation] = useState('');
  const [involved, setInvolved] = useState('');
  const [documents, setDocuments] = useState('');
  const [expectations, setExpectations] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/chatpage', { state: { situation, involved, documents, expectations } });
  };

  return (
    <div className='centered-container'> {/* Apply centering styles here */}
      <div className='input-container'>
        <div className='textarea-wrapper'>
        <label className='label'>Situation:</label>
        <textarea 
          className='inputBox'
          value={situation}
          onChange={(e) => setSituation(e.target.value)}
          placeholder='Can you briefly describe the situation? What is its current status and how has it developed?'
        />

        <label className='label'>Involved:</label>
        <textarea 
          className='inputBox'
          value={involved}
          onChange={(e) => setInvolved(e.target.value)}
          placeholder='Who are the parties involved in this situation? Are there any potential witnesses?'
        />

        <label className='label'>Documents:</label>
        <textarea 
          className='inputBox'
          value={documents}
          onChange={(e) => setDocuments(e.target.value)}
          placeholder='What legal documents do you have related to this situation? Can you briefly describe their contents?'
        />

        <label className='label'>Expectations:</label>
        <textarea 
          className='inputBox'
          value={expectations}
          onChange={(e) => setExpectations(e.target.value)}
          placeholder='What do you hope to get out of this consultation?'
        />
      </div>
      
      <div className='button-centered-container'>
        <CustomButton
          title='SUBMIT'
          onPress={handleSubmit}
          style='submit-button-input'
        />
        </div>
      </div>
    </div>
  );
}

export default InputPage;