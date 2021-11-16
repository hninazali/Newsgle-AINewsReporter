import { Container } from 'react-bootstrap'
import NewsgleTitle from '../components/NewsgleTitle';

const Header = ({ head, description }) => {
  return (
    <Container>
      <div className='starter-template text-center mt-5'>
        {/* <h1>{head}</h1> */}
        <NewsgleTitle/>
        <p>{description}</p>
      </div>
    </Container>
  )
}

export default Header
