import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Events2() {
    const [eventData, setEventData] = useState([])
    const [category, setCategory] = useState('')
    

  //   { hockey: '' },
  // { volleyball: '' },
  // { basketball: '' },
  // { football: '' },
  // { marathon: '' },
  // { badminton: '' },
  // { athletics: '' },
  // { kickboxing: ''
  // }

  

    useEffect(() => {
        axios.get(`http://localhost:3002/users`)
            .then(
                res => {
                    setEventData(res.data)
                    // setEventData(eventData.filter(item => item.category === category))
                }
            )
            .catch(err => { console.log(err); })
    }, [])
    const changeCategory = (e) => {
        setCategory(e.target.value)
        // let updated = []
        // for (let i = 0; i < eventData.length; i++) {
        //     if(eventData[i].category === category){
        //         updated.push(eventData[i])
        //     }
        // }
        // setEventData(updated)
        const filtered = eventData.filter(item => item.category === category)
        setEventData(filtered)
        console.log(eventData[2].category);
        // for (let i = 0; i < eventData.length; i++) {
        //     console.log(eventData[i].category);
        // }
    }

    return (
        <div>
            <select value={category} onChange={changeCategory}>
                <option value=''>Select an option</option>
                <option value='tennis'>Tennis</option>
                <option value='cricket'>Cricket</option>
                <option value='football'>Football</option>
                <option value='hockey'>Hockey</option>
                <option value='marathon'>Marathon</option>
                <option value='badminton'>Badminton</option>
                <option value='athletics'>Athletics</option>
                <option value='badminton'>Badminton</option>
                <option value='kick-boxing'>Kick-boxing</option>
            </select>

            <div className='d-flex'>

                {/* <img src='https://img.olympics.com/images/image/private/t_s_pog_staticContent_hero_lg_2x/f_auto/primary/frj6ok3gmklq8rc2a5ql' style={{ width: '150px', height: '150px' }} alt='' /> */}
                <Link className='text-decoration-none d-flex mt-3'>
                    {eventData.map(e => (<div className='' key={e.id}>
                        {/* <h3 className='p-1'>{e.eventName}</h3> */}
                        <h3 className='p-1'>{e.category}</h3>
                        {/* <p className='p-1'>{e.description}</p><br /> */}
                    </div>
                    ))}
                </Link>
            </div>
        </div>
    )
}


import React, { useState, useEffect } from "react";

function Events1() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  //event
//   const fetchData = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3001/users/${category}`
//       );
//       const jsonData = await response.json();
//       setEventData(jsonData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${category}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(data.map((e) => e.category));

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <select value={category} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="tennis">Tennis</option>
        <option value="volleyball">Volleyball</option>
        <option value="basketball">Basketball</option>
        <option value="cricket">Cricket</option>
        <option value="football">Football</option>
        <option value="hockey">Hockey</option>
        <option value="marathon">Marathon</option>
        <option value="badminton">Badminton</option>
        <option value="athletics">Athletics</option>
        <option value="kick-boxing">Kick-boxing</option>
      </select>
      <div>
        {data.map((item) => (
          <div key={item.id}>
            <p>{item.category}</p>
            <p>{item.description}</p>
            {/* Add more properties as needed */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events1;




//   const fetchItems = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3001/users`);
//       const data = await res.json();
//       setItems(data);
//     } catch (error) {
//       console.error("Error fetching:", error);
//     }
//   };

// const filtered = eventData.filter(item => item.category === category)
// setEventData(filtered)


//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/users/${category}`)
//       .then((res) => {
//         setEventData(res.data);
//     })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [category]);


 // let updated = [];
    // for (let i = 0; i < eventData.length; i++) {
    //   if (eventData[i].category === category) {
    //     updated.push(eventData[i]);
    //   }
    // }
    // setEventData(updated);
    // const filtered = eventData.filter(item => item.category === category)
    // setEventData(filtered)
    // console.log(updated);


    // const abc=eventData.find(x=>x.category===category)
    // console.log(abc);
    // if(abc && isActive){
    //     setShow(true)
    //     setSearch({ filter: "active" });
    // }
    // else{
    //     setShow(false)
    //     alert('no data bro')
    // }
    // e.preventDefault()


    
//   const isTennis = searchParams.get("filter") === "tennis";
//   const isVolleyball = searchParams.get("filter") === "volleyball";

/*
{ {show ? (
        <div className="card" style={{ width: "18rem" }}>
          <img className="card-img-top" src="..." alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{category}</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      ) : (
        <h1>No data</h1>
      )} }*/
