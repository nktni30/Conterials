import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const ShowNav = ({ children }) => {

      const location = useLocation();
      const [showNavbar, setShowNavbar] = useState(true)
      useEffect(() => {
            console.log('this is location:', location)
            switch (true) {
                  case location.pathname === '/admin':
                        return (
                              setShowNavbar(false)
                        )
                  case location.pathname === '/dashboard/admin':
                        return (
                              setShowNavbar(false)
                        )
                        default:
            }

      }, [location])

      return (
            <div>{showNavbar && children}</div>
      )
}

export default ShowNav;