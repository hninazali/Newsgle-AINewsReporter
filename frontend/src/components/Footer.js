const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <>
      <footer className='text-center'>
      &copy; Hnin Azali Brenda Yang & Michelle Phua (UIT2209 Project {year})
      </footer>
    </> 
  )
}

export default Footer
