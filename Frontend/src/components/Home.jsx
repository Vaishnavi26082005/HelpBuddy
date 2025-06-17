import React from 'react'
import Sidebar from './Sidebar.jsx'
import Prompt from './Prompt.jsx'

function Home() {
  return (
    <div>
        {/* SideBar */}
        <div>
            <Sidebar/>
        </div>

        {/* Prompt */}
        <div>
            <Prompt/>
        </div>
    </div>
  )
}

export default Home