import styled from 'styled-components'
import './App.css'
import FooterComponent from './components/Footer'
import AppRoutes from './routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AppContainer>
      <Content>
        <AppRoutes />
        <ToastContainer />
      </Content>
      <FooterComponent />
    </AppContainer>
  )
}
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
`
const Content = styled.div`
  flex: 1;
`

export default App
