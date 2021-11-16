// const { useEffect, useRef, useState } = React;

// const useSpeechSynthesis = (props) => {
//   const [voices, setVoices] = useState([]);
//   const synth = useRef();
//   const [textState, setTextState] = useState("");
  
//   const updateVoices = () => {
//     setVoices(synth.current.getVoices());
//   };
  
//   const speak = (text, voice, pitch = 1, rate = 1) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = voice;
//     utterance.pitch = pitch;
//     utterance.rate = rate;
//     synth.current.speak(utterance);
//   }
  
//   useEffect(() => {
//     if (typeof window !== 'object' || !window.speechSynthesis) return;
//     synth.current = window.speechSynthesis;
//     synth.current.onvoiceschanged = updateVoices;
//     updateVoices();
    
//     return () => {
//       synth.current.onvoiceschanged = null
//     }
//   }, []);
  
//   return ([
//     voices,
//     speak,
//   ]);
// }

// export default useSpeechSynthesis;