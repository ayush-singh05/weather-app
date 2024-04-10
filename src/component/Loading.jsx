import React from 'react'

function Loading() {
  
    return (
        <div className=" flex justify-center items-center h-screen">
          <div className=" border-4 rounded-full w-10 h-10 animate-spin" style={{borderLeftColor: '#3498db'}}></div>
        </div>
    )
}

export default Loading;