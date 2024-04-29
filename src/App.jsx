import React, { useState } from 'react';
import './App.css';
import words from './words.json';

function App() {
  const [index, setIndex] = useState(0);
  const [repeatFlag, setRepeatFlag] = useState(true);
  const [wordList, setWordList] = useState([...words]);
  const [gosterFlag, setGosterFlag] = useState(true);
  const handleKnown = () => {
    const updatedWords = [...words];
    updatedWords[index].known = true;
    
    setIndex(index + 1);

    const lastIndex = [...words].reverse().findIndex(word => !word.known);
    const lastFalseIndex = lastIndex !== -1 ? words.length - 1 - lastIndex : -1;

    if (index  >= lastFalseIndex) {
      setIndex(0);
      const updatedUnknownWords = words.filter(word => !word.known);
      setWordList(updatedUnknownWords);
      if(words.filter(word => !word.known).length<=0){
        setRepeatFlag(false);
      }
    
    }
  };

  const handleUnknown = () => {
    setIndex(index + 1);

    setRepeatFlag(true);

    const lastIndex = [...words].reverse().findIndex(word => !word.known);
    const lastFalseIndex = lastIndex !== -1 ? words.length - 1 - lastIndex : -1;

    if (index >= lastFalseIndex) {
      setIndex(0);
      const updatedUnknownWords = words.filter(word => !word.known);
      setWordList(updatedUnknownWords);

    }

    
  };

  const handleGoster = () => {
    
      setGosterFlag(!gosterFlag);
    
    
  };

  // Tüm kelimeler öğrenildiyse veya tekrar bayrağı false ise tebrik mesajını göster
  if (!repeatFlag) {
    return (
      <div className="App">
        <h1>Word Learning App</h1>
        <h2>Tebrikler! Tüm kelimeleri öğrendiniz.</h2>
      </div>
    );
  }
  else if(repeatFlag==true&& words[index].known==true){

    setIndex(index+1);
  }
else{
   // Bir sonraki bilinmeyen kelimeyi göster
   return ( 
    gosterFlag ? (
    <div className="App">
      <h1>Sık kullanılan Kelimeler</h1>
      <div>
        <h2>{index + 1}.Kelime: {words[index].word}</h2>
        <h4>Türkçe: {words[index].translation}  </h4>
        
        <button onClick={handleKnown}>Biliyorum</button>
        <button onClick={handleUnknown}>Bilmiyorum</button>
        <button onClick={handleGoster}>Gösterme</button>
      
      </div>
    </div>) 
    :(<div className="App">
    <h1>Sık kullanılan Kelimeler</h1>
    <div>
      <h2>{index + 1}.Kelime: {words[index].word}</h2>
      
      <button onClick={handleKnown}>Biliyorum</button>
      <button onClick={handleUnknown}>Bilmiyorum</button>
      <button onClick={handleGoster}>Göster</button>


    
    </div>
  </div>)
  );
}
 
}

export default App;