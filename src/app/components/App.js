import bindStyles from 'react-css-modules'
import {PropTypes} from 'react'
import Styles from '../styles/App.css'

const App = ({children}) => children

export default bindStyles(App, Styles)

App.propTypes = {
  children: PropTypes.element.isRequired
}
