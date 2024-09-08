import React from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet} from 'react-router-dom'


function RootLayout() {
  return (
    <div>
        <Header />
        <div style={{minHeight:"90vh"}}>
        {/*place holder of selected component*/}
        <Outlet />
        </div>
        <Footer />
    </div>
    
  )
}

export default RootLayout