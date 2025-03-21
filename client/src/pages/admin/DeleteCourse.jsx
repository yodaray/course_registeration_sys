//Delete Course Page

//imports
import axios from 'axios';
import React, { useState } from 'react';
import Search from './image/Search.png'
import AddUser from './image/AddUser.png'
import ReturnHome from './image/ReturnHome.png'
import { Link } from 'react-router-dom';


//const var
const DeleteCourse = () => {
    const [inputs, setInputs] = useState({});
    const [response, setResponse] = useState(null);
    const [err, setError] = useState(null);
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    {/* Confirm window upon form submission */}
    const handleSubmit = async(event) => {
        event.preventDefault();
        let answer = window.confirm("Confirm for deleting the Course :"+ inputs.cid)

        try {
            if (answer){
              const resp = await axios.post('/courses/del',inputs);
              setResponse(resp.data);
              setError(null);
            }
          } catch (err) {
            setError(err.response.data);
            setResponse(null);
          }
    }

    return (
        <div className='DeleteCourse'>
        <div className='navBar' style={{ width: '200px', backgroundColor: '#DFE2F3', height: '100vh', position: 'fixed', left: 0 }}>
            {/* Left side bar*/}
            <h1 className='menu' style={{ display: 'flex', justifyContent: 'center' }}>Menu</h1>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <div>
                    {<img src={Search} alt="Search Courses" style={{ marginRight: '10px' }} />}
                    </div>
                    <Link to="/admin/ViewEditCourses">Search Courses</Link>
                </li>

                <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <div>
                    {<img src={AddUser} alt="Add Courses" style={{ marginRight: '10px' }} />}
                    </div>
                    <Link to="/admin/ViewEditCourses/AddCourses">Add Courses</Link>
                </li>

                <li style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
                    <div>
                    <img src={ReturnHome} alt="Return" style={{ marginRight: '10px' }} />
                    </div>
                    <Link to="/admin/home">Return Home</Link>
                </li>
            </ul>
        </div>

        <div style={{ marginLeft: '220px' }}>
            {/* Right side */}
            <h1>Delete Courses</h1>

            <div>
            <a>Delete Course By entering the Course ID</a>
            <div>
                {/* Delete Course Form */}
            <form onSubmit={handleSubmit}>
                    <label>Enter the Course ID:(e.g. CSCI3100)
                    <input 
                        type="text" 
                        name="cid" 
                        value={inputs.cid || ""} 
                        onChange={handleChange}
                    />
                    </label>
                <input type="submit" />
                {response && <p className="response">{response}</p>}
                {err && <p className="err">{err}</p>}
            </form>
            </div>
            </div>
        </div>
        </div>
   );
};

export default DeleteCourse;