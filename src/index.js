import React from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout'
import './stylesheets/index.scss'

const root = createRoot(document.getElementById('root'))
root.render(<Layout />)
