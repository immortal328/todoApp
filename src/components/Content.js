import React,{useState} from 'react'
import Sidebar from './Sidebar'
import Task from './Task'

const Content = () => {
      // state to manage on which tab click
      // which help to retrive tasks.
      const [seletedTab, setSeletedTab] = useState("INBOX");

      return (
            <div className="content flex mx-96 h-full">
                  <Sidebar seletedTab={seletedTab} setSeletedTab={setSeletedTab}/>
                  <Task  seletedTab={seletedTab} />
            </div>
      )
}

export default Content;
