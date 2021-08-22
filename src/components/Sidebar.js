import React from 'react'
import { FaInbox,FaRegCalendarAlt,FaRegCalendar } from "react-icons/fa";

const Sidebar = ({seletedTab, setSeletedTab}) => {


      return (
            <div className="sidebar border-r-2 border-gray-300 w-96">

                  <div className={seletedTab === "INBOX" ? "active mt-32 h-16 flex items-center":"mt-32 h-16 flex items-center"}
                        onClick={()=>setSeletedTab("INBOX")}>
                        <strong className="mx-3 text-2xl"><FaInbox/></strong>
                        <p className="text-2xl">Inbox</p>
                  </div>

                  <div className={seletedTab === "TODAY" ? "active h-16 flex items-center":"h-16 flex items-center"}
                        onClick={()=>setSeletedTab("TODAY")}>
                        <strong className="mx-3  text-2xl"><FaRegCalendar/></strong>
                        <p className="text-2xl">Today</p>
                  </div>

                  <div className={seletedTab === "NEXT_7" ? "active h-16 flex items-center":"h-16 flex items-center"}
                        onClick={()=>setSeletedTab("NEXT_7")}>
                        <strong className="mx-3  text-2xl"><FaRegCalendarAlt/></strong>
                        <p className="text-2xl">Next 7 days</p>
                  </div>
                  
            </div>
      )
}

export default Sidebar;
