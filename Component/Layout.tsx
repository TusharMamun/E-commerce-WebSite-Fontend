"use client"
import { persisdata, store } from '@/Redux/store'
import React, { ReactNode } from 'react'
import { SessionProvider } from "next-auth/react"

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import MainLoder from './SheardComponent/MainLoder'


const Layout = ({children}:{children:ReactNode}) => {
  return (
<SessionProvider>
   <Provider store={store}>
<PersistGate loading={<MainLoder/>} persistor={persisdata}>
        {children}
</PersistGate>
    </Provider>

</SessionProvider>
  )
}

export default Layout