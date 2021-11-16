import Header from '../components/Header'
import Meta from '../components/Meta'
import { InputGroup, FormControl, Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import GifSpinner from '../components/GifSpinner';

// import NewsgleTitle from '../components/NewsgleTitle';
// import useSpeechSynthesis from '../components/useSpeechSynthesis';

const useSpeechSynthesis = () => {
  // const [voices, setVoices] = useState([]);
  const synth = useRef();
  
  // const updateVoices = () => {
  //   setVoices(synth.current.getVoices());
  // };
  
  const speak = (text, pitch = 1, rate = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current = window.speechSynthesis;
    synth.current.cancel();
    synth.current.speak(utterance);
  }
  
  // useEffect(() => {
  //   if (typeof window !== 'object' || !window.speechSynthesis) return;
  //   synth.current = window.speechSynthesis;
  //   synth.current.onvoiceschanged = updateVoices;
  //   updateVoices();
    
  //   return () => {
  //     synth.current.onvoiceschanged = null
  //   }
  // }, []);
  
  return ([
    // voices,
    speak
  ]);
}

const Home = () => {
  // page content
  const pageTitle = 'Newsgle'
  const pageDescription = 'Get a summary of all Singapore news articles related to your search in an instant!'
  const [keyword, setKeyword] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSummaryText("");
    setPlayStat("Empty");
  }
  const handleShow = () => setShow(true);
  const [summaryText, setSummaryText] = useState("");
  const [playStat , setPlayStat] = useState("Empty");
  const [ speak ] = useSpeechSynthesis();
  const [ text, setText ] = useState("Nothing to read out");
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   if (typeof window !== 'object' || !window.speechSynthesis) return;
  //   synth.current = window.speechSynthesis;
  //   synth.current.onvoiceschanged = updateVoices;
  //   updateVoices();
    
  //   return () => {
  //     synth.current.onvoiceschanged = null
  //   }
  // }, []);

  const handleSubmit = () =>{
    setIsLoading(true)
    handleShow();
    const element = document.querySelector('#post-request .article-id');
    const article = { title: 'Axios POST Request Example' };
    const body = {"keyword": keyword};
    // setSummaryText("READ THIS paragraph to test. Lorem Ipsum blah blah. Need to insert a long text to test Pause but I don't know what to write.");
    axios.post("https://ainewsreporter.herokuapp.com/getsummary", body).then(response => {setIsLoading(false); setSummaryText(response.data)});
    // axios.post("http://localhost:5000/getsummary", body).then(response => {setIsLoading(false); setSummaryText(response.data)});
  }

  // const handleSpeak = () => {
  //   useSpeechSynthesis.speak(summaryText);
  // }

  // const speak = (text, pitch = 1, rate = 1) => {
  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.voice = new SpeechSynthesisVoice.default;
  //   utterance.pitch = pitch;
  //   utterance.rate = rate;
  //   synth.current.speak(utterance);
  // }

  const handlePause = () => {
    window.speechSynthesis.pause();
    setPlayStat("Paused");
    console.log("Paused");

  }

  const handleResume = () => {
    window.speechSynthesis.resume();
    setPlayStat("Playing");
    console.log("resumed");
  }

  // const handleRead = (text) => {
  //   console.log("Reading:", summaryText);
  //   // const msg = new SpeechSynthesisUtterance(summaryText);
  //   // speak(summaryText);
  //   // window.speechSynthesis.speak(msg);
  //   // synth.current.speak(msg);
  //   speak(summaryText);

  //   setPlayStat("Playing");
  // }

  const handleRead = (text) => {
    console.log("Reading:", summaryText);
    const msg = new SpeechSynthesisUtterance(summaryText);
    // speak(summaryText);
    // window.speechSynthesis.speak(msg);
    // synth.current.speak(msg);
    speak("Good Evening UIT2209 class, this is A I Reporter Hady Lines from Newsgle! Here's the summary :" + summaryText);

    setPlayStat("Playing");
  }

  const renderButtons = () => {
    if (playStat === "Empty"){
      return <Button variant="dark" onClick = {handleRead}> Hello Heidi Lynes, read out pls! </Button>;
    }
    else if (playStat === "Paused"){
      return <div><Button variant="secondary" onClick = {handleResume}> Resume </Button>&nbsp;&nbsp;<Button variant="dark" onClick = {handleRead}> Hello Heidi Lynes, read out pls!</Button></div>;
    }
    else if (playStat === "Playing"){
      return <div><Button variant="secondary" onClick = {handlePause}> Pause </Button>&nbsp;&nbsp;<Button variant="dark" onClick = {handleRead}> Hello Heidi Lynes, read out pls!</Button></div>;
    }
  }
  return (
    <div>
      <br/>
      {/* <Meta title={pageTitle} /> */}
      {/* <Meta title={NewsgleTitle} /> */}
      <Header head={pageTitle} description={pageDescription} />
      <br />
      <Container fluid="md">
        <Row className="justify-content-md-center">
          <Col md="6">
            <InputGroup className="mb-3">

              {/* <InputGroup.Text id="basic-addon1">@</InputGroup.Text> */}
              <FormControl
                placeholder="What would you like to search?"
                aria-label="What would you like to search?"
                aria-describedby="basic-addon1"
                onChange={e => {setKeyword(e.target.value)}}
              />
              <Button variant="secondary" id="button-addon1" onClick={handleSubmit}>
                Search
              </Button>
            </InputGroup>
          </Col>

        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Summary of News AI found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="d-flex justify-content-center">
          {!isLoading ? (
            <>
              Here's the news summary : 
              <br/>
              {summaryText}
            </>
          ) : (
              <GifSpinner
                imageSrc="https://c.tenor.com/KgUoHE61zvYAAAAC/qoobee.gif"
                overlayBackground="rgba(0,0,0,0.5)"
                loading={isLoading}
              />

            // <ReactLoading
            //   className="spinner"
            //   type="spin"
            //   color="blue"
            //   height="5%"
            //   width="5%"
            // />
          )}
          </div>
        {/* Here's the news summary : 
          <br/>
          {summaryText} */}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {renderButtons()}
          
        </Modal.Footer>
      </Modal>


    </div>
  )
}





export default Home