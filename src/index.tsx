import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import RootProvider from './components/Providers/RootProvider'
import reportWebVitals from './reportWebVitals'
const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root)


rootDiv.render(
    <RootProvider>
        <App />
    </RootProvider>
)
// const popupWindow = window.open(
//     chrome.extension.getURL("index.html"),
//     "CONET Platfrom",
//     "width=20rem,height=30rem"
// )
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
