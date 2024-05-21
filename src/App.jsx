import { useEffect, useState } from 'react'


import './App.css'

function App() {
  const [result, setResult] = useState([])
  const [selected,setSelected] = useState({})
  const [show,setShow] = useState(false)
  const [firstName,setFirstName] = useState("")
  const [lastName,setLastName] = useState("")
  const [address,setAddress] = useState("")
  const [email,setEmail]= useState("")
  const [contact,setContact] = useState("")
  const [salary,setSalary] = useState("")
  const [date,setDate] = useState("")
  const [image,setImage] = useState("")

  const fetchData = async()=>{
    const response = await fetch('/data.json')
    const data = await response.json()
    console.log(data)
    setResult(data)
    setSelected(data[0])

  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    console.log(firstName,lastName,address,email,contact,salary,date,image)
    const newEmployee = {
      id: result.length + 1,
      firstName,
      lastName,
      address,
      email,
      contactNumber: contact,
      salary,
      dob: date,
      imageUrl: image,
    };
    setResult([...result, newEmployee]);
    console.log(newEmployee);
    setAddress("")
    setFirstName("")
    setLastName("")
    setEmail("")
    setContact("")
    setSalary("")
    setAddress("")
    setDate("")
    setShow(false)

  }
  const handleDelete = (index)=>{
       delete result[index]
       console.log(updatedRes)
       setResult(updatedRes)
  }

  useEffect(()=>{
fetchData()
  },[])

  return (
    <>
    <div className='app'>
    <header className="header">
      <h1>Employee Database Management</h1>
      <button
      onClick={()=>setShow(true)}
      className='createEmployee'>
        Add Employee
      </button>
    </header>

    </div>
    <div className="employees">
      <div className='employees__names'>
         <span className='employees__name--title'>
Employee List
         </span>
         <div className="employees__names--list">
          {
            result.map((employee,index)=>{
              // console.log(employee)
              return(
                <div
                
                className={`list-item
          ${Number(selected.id) == Number(employee.id)?"list-item-selected":""}`}
          onClick={()=>setSelected(employee)}
          >
              <span 


>{employee.firstName}</span>
<span
onClick={()=>handleDelete(index)}
>✖️</span>
</div>
)
})
          }

         </div>

      </div>
      <div className="employees__single">
        <span  className="employees__single--title">
        Employee Information
        </span>
        <div className="employee__names--info">
          <img src={selected.imageUrl} alt="" />
          <h1>{selected.firstName} {selected.
lastName
}</h1>
<p>{selected.
address}</p>
<p>{selected.email}</p>
<p>Mobile- ${selected.contactNumber}</p>
<p>DOB - ${selected.dob}</p>

        </div>

      </div>
    </div>
    { show &&
    <div className="addEmployee">
      <form action=""
      onSubmit={handleSubmit}
      className='addEmployee_create'
      >
 <h3>Add a new Employee</h3>
   <div>
    <input type="text"
    placeholder='First Name'
    value={firstName}
    onChange={(e)=>setFirstName(e.target.value)}
    />
    <input type="text" placeholder='LastName'
    value={lastName}
    onChange={(e)=>setLastName(e.target.value)}
    />
   </div>
   <input type='text'
   value={image}
   onChange={(e)=>setImage(e.target.value)}
   placeholder="Image URL (optional)" />

   <input type="email" placeholder='Email' 
   value={email}
   onChange={(e)=>setEmail(e.target.value)}
   required />
   <input type="number"
   value={contact}
   onChange={(e)=>setContact(e.target.value)}
   placeholder='contact' />
   <input type="number"
   value={salary}
   onChange={(e)=>setSalary(e.target.value)}
   placeholder='salary' />
   <input type="text"
   value={address}
   onChange={(e)=>setAddress(e.target.value)}
   placeholder='address' />
   
   <input type="date"
   value={date}
   onChange={(e)=>setDate(e.target.value)}
   placeholder='Date of birth'
   />
   <input type="submit" value="Submit" />
   <button
   onClick={()=>setShow(false)}
   >cancel</button>



      </form>
    </div>}
    </>
  )
}

export default App
