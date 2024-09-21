import React from 'react'
import StreamVideoProvider from '../../../providers/StreamClientProvider'

function RootLayout({children}:{children:React.ReactNode}) {
  return (
    <main>
    <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
      
    </main>
  )
}

export default RootLayout