
import Header from '../components/Header'
import Meta from '../components/Meta'
import { InputGroup, FormControl, Container, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import NewsgleTitle from '../components/NewsgleTitle';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const synth = useRef();
  
  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };
  
  const speak = (text, pitch = 1, rate = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current = window.speechSynthesis;
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
  const pageDescription = 'Get a summary of all news articles related to your search in an instant!'
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



  const handleSubmit = () =>{
    handleShow();
    const element = document.querySelector('#post-request .article-id');
    const article = { title: 'Axios POST Request Example' };
    const body = {"keyword": keyword};
    setSummaryText("READ THIS paragraph to test");
    // axios.post("http://127.0.0.1:5000/getsum", body).then(response => {setSummaryText(response.data)});
  }


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

  const handleRead = (text) => {
    console.log("Reading:", summaryText);
    const msg = new SpeechSynthesisUtterance(summaryText);
    speak(summaryText);
    // window.speechSynthesis.speak(msg);
    // synth.current.speak(msg);

    setPlayStat("Playing");
  }

  const renderButtons = () => {
    if (playStat === "Empty"){
      return <Button variant="dark" onClick = {handleRead}> Hello Siri, read out pls! 🗣 </Button>;
    }
    else if (playStat === "Paused"){
      return <div><Button variant="primary" onClick = {handleResume}> Resume</Button><Button variant="dark" onClick = {handleRead}> Hello Siri, read out pls!</Button></div>;
    }
    else if (playStat === "Playing"){
      return <div><Button variant="primary" onClick = {handlePause}> Pause</Button><Button variant="dark" onClick = {handleRead}> Hello Siri, read out pls!</Button></div>;
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
          {summaryText}
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