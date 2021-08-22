import React from 'react'
import {SiTodoist} from "react-icons/si";

const Header = () => {
      return (
            <header className=" header border-b-2 bg-red-500 border-black">
                  <nav className=" mx-96 flex items-center h-full">
                        <div className="text-5xl">
                              <SiTodoist/>
                        </div>
                  </nav>
            </header>
      )
}

export default Header;
