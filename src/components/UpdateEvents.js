import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function UpdateEvents() {
    const [data, setData] = useState([]);
    const [updatedEventName, setUpdatedEventName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');
    const [selectedEventId, setSelectedEventId] = useState('');
    const [isPopUp, setIsPopUp] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:3001/users`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
    }, []);

    const handlePopUp = (e) => {
        setIsPopUp(true);
        setUpdatedEventName(e.eventName);
        setUpdatedDescription(e.description);
        setUpdatedCategory(e.category);
        setSelectedEventId(e.id);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (updatedEventName && updatedCategory && updatedDescription !== "") {
            axios.put(`http://localhost:3001/users/${selectedEventId}`, {
                eventName: updatedEventName,
                description: updatedDescription,
                category: updatedCategory
            })
                .then(res => {
                    console.log(res);
                    setIsPopUp(false);
                    setData(prevData => prevData.map(item => item.id === selectedEventId ? { ...item, eventName: updatedEventName, description: updatedDescription, category: updatedCategory } : item));
                })
                .catch(err => console.log(err));
        }
        else alert('Please fill all the required fields')

    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/users/${id}`)
            .then(res => {
                console.log(res.data);
                setData(prevData => prevData.filter(item => item.id !== id));
                alert('Successfully Deleted');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='updated-event-div'>
            <img className='update-img' src='https://t3.ftcdn.net/jpg/02/88/08/16/360_F_288081679_LHBFIsQCcRmMMCRbz67I4hvkDgu2SNed.jpg' />
            <div className='updated-event-div1'>
                <table border={1} className='updated-table'>
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th colSpan='2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(e => (
                            <tr key={e.id}>
                                <td>{e.eventName}</td>
                                <td>{e.description}</td>
                                <td>{e.category}</td>
                                <td><button className='updated-btn btn-update' onClick={() => handlePopUp(e)}>Update</button></td>
                                <td><button className='updated-btn btn-delete' onClick={() => handleDelete(e.id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isPopUp && <div className='updated-main-div'>
                <div className='updated-popup'>

                    <h2 className='updated-h2'>Update Events</h2>
                    <button className='update-close  ' onClick={() => { setIsPopUp(false) }}>X</button>

                    <form onSubmit={handleUpdate} className='updated-form'>
                        <div className=''>
                            <label>Event name:</label><br />
                            <input className='text inputs' style={{ textTransform: 'capitalize' }} type='text' value={updatedEventName} onChange={(e) => { setUpdatedEventName(e.target.value) }} required /><br />
                        </div>
                        <div>
                            <label>Description:</label><br />
                            <textarea className='text inputs' style={{ textTransform: 'capitalize' }} value={updatedDescription} onChange={(e) => { setUpdatedDescription(e.target.value) }} /><br />
                        </div>
                        <div>
                            <label>Category:</label><br />
                            <select className='inputs' value={updatedCategory} onChange={(e) => { setUpdatedCategory(e.target.value) }} aria-required='true'>
                                <option value='select-an-option'>Select an option</option>
                                <option value='tennis'>Tennis</option>
                                <option value='cricket'>Cricket</option>
                                <option value='football'>Football</option>
                                <option value='hockey'>Hockey</option>
                                <option value='marathon'>Marathon</option>
                                <option value='badminton'>Badminton</option>
                                <option value='athletics'>Athletics</option>
                                <option value='badminton'>Badminton</option>
                                <option value='kickboxing'>Kick-boxing</option>
                            </select><br />
                        </div>
                        <button className='updated-form-btn' type='submit'>Update Events</button>
                    </form>

                </div>
            </div>}
        </div>
    );
}

