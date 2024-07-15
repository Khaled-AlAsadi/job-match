import styled from 'styled-components'
import './App.css'
import FooterComponent from './components/Footer'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <AppContainer>
      <Content>
        <AppRoutes />
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
