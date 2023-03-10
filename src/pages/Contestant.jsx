import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

import ProfileHeader from '../partials/ProfileHeader';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
// import axios from 'axios'

// let allUploads = []


let formdata = new FormData();
let submit = []
let sub = []

function Profile({user,...rest}) {
  
  const location = useLocation()
  const [deadline, setDeadline] = useState(false)
  const [file, setFile] = useState([])
  const [reset, setReset] = useState(location.state.submission)
  

  useEffect(()=>{

    const fileSelector = document.getElementById('file');   
    const fileList = []
    // console.log(location.state.submission.length > 0)
    // console.log(location.state)
    // if(location.state.submission){
    //   if(location.state.submission.length !== 'undefined'){
    //     // console.log(location.state.submission)
    //     (location.state.submission.length > 0)?setReset([...location.state.submission]):setReset([])
    //   }
    // }
    // setReset(location.state.submission)
    fileSelector.addEventListener('change', (event) => {
      
      // setFile([])
      fileList.push(event.target.files);
      // console.log(event.target.files) 
      // console.log(fileList)
      if(fileList[0].length >1){
        fileList.map((list,i)=>{
          sub.push(...fileList[i])
        })
        
        // console.log(sub)
        sub.map((item,i)=>{
          submit.push({'upload': item,'date': Date().slice(0,25), 'id': location.state.userID})
          
        })
        setFile([...submit])

        // while(fileList.length >0){
        //   fileList.pop()
        // }
        while(sub.length >0){
          sub.pop()
        }
        while(submit.length >0){
          submit.pop()
        }
      } 
      else{
        const submission = {'upload': fileList[0][0], 'date': Date().slice(0,25), 'id': location.state.userID}
        setFile([submission])
        // console.log(submission, fileList)
      } 
        // console.log(file)
        while(fileList.length >0){
          fileList.pop()
        }
        
    });

  },[])

  const handleSubmit = (e) => {
    // const navigate = useNavigate();
    e.preventDefault()
    // console.log(file) 
    //Setting up the array of files for the backend
    if(!file.length){
      // console.log(file) 
      formdata.append('files',file.upload)  
      formdata.append('userID',file.id) 
      formdata.append('date',file.date)
    }else if(file.length === 1){
      // console.log(file) 
      formdata.append('files',file[0].upload)  
      formdata.append('userID',file[0].id) 
      formdata.append('date',file[0].date)
    }else{
      file.map((mfile)=> {
        // allUploads.push(mfile)
        formdata.append('files',mfile.upload) 
        formdata.append('userID',mfile.id) 
        formdata.append('date',mfile.date)
      })      
    }

    //Posting to the Backend Array of files 'http://localhost:5000/upload'

    fetch('http://localhost:10000/upload', {
      method: 'POST',
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        setReset([...data.submission])
        // console.log(`${data.length} files stored on ${Date().slice(0,25)}!`)
        // setFile([])        
        // console.log(data) 
      })
      .catch((err) => console.error(err));
    // console.log(...formdata.entries()) 
    setFile([]) 
    
    // file.map(item => formdata.delete(item.upload.name))
    formdata.delete('date')
    formdata.delete('userID')
    formdata.delete('files')
    document.getElementById('file').value = null
    // console.log(...formdata) 
    
  }
  

  const Deadline =()=>{
    var countDownDate = new Date("Mar 13, 2023 24:00:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
     
      document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text
      if (distance < 0) {
        setDeadline(true)
        clearInterval(x);
        document.getElementById("demo").innerHTML = "SUBMISSION DEADLINE EXPIRED";
      }
    }, 1000);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <ProfileHeader name={location.state.name}/>

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
                <h1 className="h1">{location.state.userID}</h1>
              </div>
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                {/* <h6 className="h6">Fullname | {location.state.name}</h6> */}
                <h6 className="h6">Company | {location.state.company} </h6>
                <h6 className="h6">Email | {location.state.email} , Tel | {location.state.telephone}</h6>
                <h6 className="h4" id='demo'>{Deadline()}</h6>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">               
                <form onSubmit={(evt)=>handleSubmit(evt)} hidden={deadline} >
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3" >
                      <input id="file" type="file" className="form-input w-full text-gray-300" multiple="multiple" required />
                    </div>
                  </div>                 
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Submit Now</button>
                    </div>
                  </div>
                </form>               
              </div>

            </div>
          </div>
        </section>
        <div className='container'>
              <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
                <h1 className="h4">Your Submission(s)</h1>
              </div>
          
              {
                (reset.length === 0 )?<p className='text-center'>Kindly make a submission</p>:
                
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Filename</th>                      
                      <th scope="col">Size(MB)</th>
                      <th scope="col">Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    
                    (reset.length > 0)?
                    reset.map((el,ind)=>{    
                        // console.log(location.state.submission)                                     
                        return <tr key={ind}>
                          <td>{ind}</td>
                          <td>{el.filename}</td>                          
                          <td>{(el.size/1000000).toFixed(2)}</td>
                          <td>{el.date}</td>
                        </tr>
                      }):null
                    
                    
                  }
                  </tbody>
                </table>
              }              
            
          {/* <img src={image1} class="img-thumbnail" alt="../images/logo.png"></img> */}
        </div>
      </main>      
      <Banner />

    </div>
  );
}

export default Profile;