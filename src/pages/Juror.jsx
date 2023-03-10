import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

import ProfileHeader from '../partials/ProfileHeader';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
// import axios from 'axios'

// let allUploads = []



function Profile({user,...rest}) {

  const location = useLocation()
  const [contestants, setContestants] = useState([...location.state.contestant])
  const [ID,setID] = useState(location.state.contestant[0].userID)
  const [selected, setSelected] = useState(0)
  
  useEffect(()=>{ 
    // setContestants([...location.state.contestant])
    // setID(location.state.contestant[0].userID)
    // setSelected(0)
    // setTimeout(()=>{setContestants([...location.state.contestant])},10000)
  },[])

  const handleClick = (e,id,index) => {
       e.preventDefault()
       setID(id)
       setSelected(index)
       
      //  console.log(id, index)
  }
  
  const handleDownload = (e,el)=>{
    e.preventDefault()
    // console.log(el)

    const data = `data:,${el.path}`;
    const filename = el.filename;
    const aTag = document.createElement('a');

    aTag.href = data;
    aTag.download = filename;
    aTag.click();
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <ProfileHeader name={location.state.juror.name}/>

      {/*  Page content */}
      <main className="grow">

        {/*  Page illustration */}
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-24 pb-12 md:pt-25 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h1">{location.state.juror.name}</h1>
              </div>
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                {/* <h6 className="h6">Fullname | {location.state.name}</h6> */}
                <h6 className="h6">Discipline | {location.state.juror.discipline} </h6>
                <h6 className="h6">Email | {location.state.juror.email} </h6>
               
              </div>

            </div>
          </div>
        </section>
        <div className='container'>
              <div className='row'>
                <div className="col-md-3 col-xs-12">
                  <h1 className="h4 text-center">DYV Competition</h1>
                  <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                          {/* <th scope="col">#</th> */}
                          <th scope="col" className='text-center'>Contestants</th>   
                        </tr>
                    </thead>
                    <tbody>
                    {
                      
                      (contestants.length > 0)?
                      contestants.map((el,ind)=>{    
                          // console.log(location.state.submission)                                     
                          return <tr key={ind} onClick={(e)=>handleClick(e,el.userID, ind)}>
                                    <td className='text-center'>{el.userID}</td>
                                  </tr>
                        }):null
                      
                      
                    }
                        
                    </tbody>
                  </table>
                </div>
                <div className="col-md-9 col-xs-12 ">
                  <h1 className="h4 text-center">{ID} Submissions</h1>
                  <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      {/* <th scope="col">#</th> */}
                      <th scope="col" className=''>Filename</th> 
                      <th scope="col" className='text-center'>Size(MB)</th>   
                      <th scope="col" className='text-center'>Submission Date</th>     
                    </tr>
                  </thead>
                  <tbody>
                  {
                    // console.log(contestants[selected].submission) 
                    (contestants[selected].submission.length > 0)?
                    contestants[selected].submission.map((el,ind)=>{    
                        // console.log(location.state.submission)                                     
                        return <tr key={ind} onClick={(e)=>handleDownload(e,el)} >
                                  {/* <a href="data:application/xml;charset=utf-8" download={el.filename}>
                                  </a> */}
                                  <td className=''>{el.filename}</td>
                                    <td className='text-center'>{(el.size/1000000).toFixed(2)}</td>
                                    <td className='text-center'>{el.date}</td>
                                </tr>
                      }):<p>Contestant has made no submission</p>
                    
                    
                  }
                        
                  </tbody>
                </table>
                </div>
              </div>
        </div>
      </main>      
      <Banner />

    </div>
  );
}

export default Profile;