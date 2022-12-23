import { useEffect, useState } from 'react';
import { HangImage } from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord'
import './App.css'

function App() {

  const [ word, setWord ] = useState(getRandomWord());
  const [ hiddenWord, setHiddenWord ] = useState('_ '.repeat(word.length));
  const [ attempts, setAttempts ] = useState(0);
  const [ lose, setLose ] = useState( false );
  const [ won, setWon ] = useState( false );
 
  // Determinar si la persona perdió
  useEffect( () => {
    if(attempts >= 9){
      setLose(true);
    }
  }, [attempts] );

 // Determinar si la persona ganó
 useEffect(() => {
  const currentHiddenWord = hiddenWord.split(' ').join('');
  if(currentHiddenWord === word) setWon(true);
 }, [hiddenWord]);

  const checkLetter = ( letter: string ) => {
    if(lose){return};
    if(won){return};

    if ( !word.includes( letter ) ){
      setAttempts( Math.min(attempts + 1, 9) );
      return;
    }

    const hiddenWordArray = hiddenWord.split(' ');
    for ( let i = 0; i < word.length; i++ ){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }
    setHiddenWord(hiddenWordArray.join(' '));

  } 

  const newGame = () => {
    const newWord = getRandomWord();

    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length) );
    
    setAttempts(0);
    setLose(false);
    setWon(false);
  }


  return (
    <div className="App">
      
      {/* Imagenes */}
      <HangImage imageNumber = { attempts }/>
      
      {/* Palabra Oculta */}
      <h2>{ hiddenWord }</h2>

      {/* Contador de intentos */}
      <h3>Intentos: { attempts }</h3>

      {/* Mensaje si se pierde */}
      {
        ( lose ) 
        ? <h2>Perdió, la palabra era { word }</h2> 
        : ''
      }
      {
        ( won ) 
        ? <h2>Felicidades, has acertado la palabra!</h2> 
        : ''
      }

      {/* Botones de letras */}
      {
        letters.map( (letter) => (
          <button 
            key = { letter }
            onClick={() => checkLetter(letter)}>
            { letter }
          </button>
        ) )
      }
      
      {/* Reinicio del juego */}
      <br /><br />
      <button onClick = { newGame }>¿Nuevo Juego?</button>
    </div>
  )
}

export default App
