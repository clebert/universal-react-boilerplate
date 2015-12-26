import {PropTypes} from 'react'

const App = ({children}) => children

export default App

App.propTypes = {
  children: PropTypes.element.isRequired
}
