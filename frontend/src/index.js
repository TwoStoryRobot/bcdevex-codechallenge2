/* Application entry point
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { UserProvider } from './components/UserContext'
import App from './components/App'

import 'typeface-roboto'
import './index.css'

const theme = createMuiTheme()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
)
