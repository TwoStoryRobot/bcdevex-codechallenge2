/* Application entry point
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { AuthProvider } from './components/AuthContext'
import App from './components/App'

import 'typeface-roboto'
import './index.css'

const theme = createMuiTheme()

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
)
