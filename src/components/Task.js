import React,{useState} from 'react';
import DayPickerInput from "react-day-picker/DayPickerInput"; //ReactDayPicker
import dateFnsFormat from "date-fns/format"; //DateFns
import isAfter from "date-fns/isAfter";
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';


import "react-day-picker/lib/style.css";

const FORMAT='dd/MM/yyyy';
function formatDate(date, format, locale) {
      return dateFnsFormat(date, format, { locale });
}

const AddTask =({onAddTask, onCancel})=>{

      const [task, setTask] = useState('');
      const [date, setDate] = useState(null);

      return(
            <div className="addTaskDialog mt-1 ">
                  <input className="border-2 border-gray-400 rounded-md w-full h-8 px-2"
                        value={task} onChange={(event)=>{setTask(event.target.value)}}/>

                        <div className="addTasActionContainer mt-1 grid grid-cols-2 ">
                              <div className="btnConatiner">
                                    <button className="addBtn  p-2 bg-red-400 hover:bg-red-500 text-white font-semibold rounded-lg"
                                          disabled={!task}
                                          onClick={()=>{
                                                onAddTask(task,date);
                                                onCancel()
                                                setTask('')
                                                }}>Add task
                                    </button>
                                    
                                    <button className="cancelBtn ml-1 py-2 px-3 font-semibold rounded-lg hover:bg-gray-100"
                                          onClick={()=>{
                                                onCancel()
                                                setTask('')
                                                }}>Cancel
                                    </button>
                              </div>
                        </div>

                        <div className="iconContainer calender ">
                              <DayPickerInput classNames="inCal" 
                              onDayChange={(day)=>setDate(day)} 
                              placeholder={`${dateFnsFormat(new Date(),FORMAT)}`} 
                              formatDate={formatDate}
                              format={FORMAT}
                              dayPickerProps={{
                                    modifiers:{
                                          disabled:[{before:new Date()}],
                                    },
                              }}
                              />
                        </div>
            </div>
      );

}

const taskHeaderMapping ={
      INBOX:"Inbox",
      TODAY:"Today",
      NEXT_7:"Next 7 days"
};

const TaskItems =({seletedTab,tasks})=>{
      let taskToRender =[...tasks];
      if(seletedTab === "NEXT_7"){
      taskToRender = taskToRender.filter(
            (task)=>isAfter(task.date, new Date()) &&
                  isBefore(task.date, addDays(new Date(),7))
            );
      }
      if(seletedTab === "TODAY"){
      taskToRender=taskToRender.filter((task)=>isToday(task.date))
      }

      return(
            <div className="taskItemsContainer">
                  {taskToRender.map((task,index)=>(
                        <div key={index} className="listItem flex justify-between py-2 text-2xl font-semibold">
                              <p>{task.text}</p>
                              <p>{dateFnsFormat(new Date(task.date),FORMAT)}</p>
                        </div>
                  ))}
            </div>
      )
};


const Task = ({seletedTab}) => {
      
      const [toggleAddTask, setToggleAddTask] = useState(false);
      const [tasks, setTasks] = useState([]);

      const addNewTask = (text,date)=>{
            const newTaskItem ={text,date:date||new Date() };
            setTasks((prevState)=>[...prevState, newTaskItem]);
      }

      return (
            <div className="task w-full bg-white">
                  <div className="pt-36 pl-6 pr-10">
                        <div>
                              <h1 className="text-4xl font-extrabold">{taskHeaderMapping[seletedTab]}</h1>
                        </div>

                        {seletedTab === "INBOX" ?
                              <div className="addTaskBtn inline-block items-center mt-1"
                                    onClick={()=>{setToggleAddTask((prevState)=>!prevState)}}>
                                    <span className="plus text-xl text-red-500">+</span>
                                    <span className="addTaskText ml-3 text-gray-600">Add Task</span>
                              </div>:null
                        }
                        
                        {toggleAddTask ? 
                              <AddTask 
                              onAddTask={addNewTask}
                              onCancel={()=> setToggleAddTask(false)} />:null}

                        {tasks.length > 0 ? <TaskItems tasks={tasks} seletedTab={seletedTab}/> :<p className="mt-3">No Task Yet</p>}
                  </div>                  
            </div>
      )
}

export default Task;
