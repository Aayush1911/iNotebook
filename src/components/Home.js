import Notes from './Notes'

function Home(props) {
  const {showalert}=props
  return (
    <div>
    <Notes showalert={showalert}/>
    </div>
  )
}

export default Home
