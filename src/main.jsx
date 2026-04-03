import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import StatePage from './StatePage.jsx'
import BlogPage from './BlogPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/:stateSlug" element={<StatePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
