import './App.css';
import {useState,useEffect} from "react"
function App() {
  const [object1,setObject1] = useState({
    title:"",
    content:"",
    isClick:false,
    id:0,
  })
  const [object2,setObject2] = useState(JSON.parse(localStorage.getItem('object2')) ?? [])
  const [count, setCount]= useState(0)
  useEffect(()=>{
    localStorage.setItem('object2',JSON.stringify(object2));
  },[object2])
  const handleAdd=()=>{
    if(object1.title!=="" && object1.content!==""){
      setCount(count+1)
      setObject2([...object2,object1]);
      setObject1({title:"",content:"", id:count+1})
    }
  }
  const handleDelete=(index)=>{
    const newObject=object2.filter((value,id)=>id!==index)
    setObject2([...newObject])
  }
  const handleClick=(index)=>{
    const updateObject=object2.map((push)=>{
      console.log(index);
      if (push.id===index){
        return {...push,isClick:!push.isClick}
      }
      else {
        return {...push}
      }
  })
    setObject2(updateObject)
  }
  const handleEnter=(e)=>{
    if(e.code==="Enter"){
      handleAdd();
    }
  }
  // console.log(object2);
    return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-12 bg-gradient-to-r from-sky-500 to-indigo-500">
      <div className="bg-white w-full rounded-lg p-4 max-w-xl items-center drop-shadow-xl min-h-[15rem] flex flex-col">
        <h1 className="text-2xl font-semibold text-center mb-4 text-sky-500">
          Ghi chú
        </h1>
        <input 
            type="text"
            className="border-[2px] border-blue-500 rounded-lg w-3/4 py-2 px-4 outline-green-500"
            placeholder="Enter title..."
            value={object1.title}
            onKeyDown={(e)=>handleEnter(e)}
            onChange={(e)=>setObject1({...object1,title:e.target.value})}>
        </input>
        <textarea
          type="text"
          className="border-[2px] border-blue-500 rounded-lg w-3/4 py-2 px-4 outline-green-500 mt-4"
          placeholder="Enter content..."
          value={object1.content}
          onChange={(e)=>setObject1({...object1,content:e.target.value})}>
        </textarea>
        <button className='button bg-sky-500 mt-3 h-8 w-20 rounded-lg text-white hover:bg-sky-800'
        onClick={handleAdd}>Tạo</button>
      </div>
      <div className="flex flex-row flex-wrap gap-4 w-4/5 place-content-center">
        {object2.map((push,index)=>(
          <div className={(push.isClick===true)?"bg-yellow-300 flex-col flex mt-12 rounded-lg h-max w-52  ":" bg-white flex-col flex mt-12 rounded-lg h-max w-52  "} >
          <p className="text-lg py-1 px-2 text-2xl font-semibold">
          {push.title}
          </p>
          <div className="px-2">
            {push.content} 
          </div>
          <div className='flex justify-items-end '>
            <button className='w-1/2 bg-red-600 items-center rounded-bl-lg'
            onClick={()=>handleDelete(index)}>
              <i class="fa-solid fa-trash"></i>
            </button>
            <button className="star w-1/2 bg-yellow-400 items-center rounded-br-lg"
            onClick={()=>handleClick(push.id)}>
            <i class="fa-regular fa-star"></i>
            </button>
          </div>          
      </div>     
        ))}
      </div>
  </div>
  );
}
export default App;
