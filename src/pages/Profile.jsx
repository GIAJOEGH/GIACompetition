import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

import ProfileHeader from '../partials/ProfileHeader';
import PageIllustration from '../partials/PageIllustration';
import Banner from '../partials/Banner';
import axios from 'axios'

const allUploads = []
let fileList = []

function Profile({user,...rest}) {

  const location = useLocation()
  const [deadline, setDeadline] = useState(false)
  const [file, setFile] = useState([])
  const [reset, setReset] = useState([])

  
  

  useEffect(()=>{
    const fileSelector = document.getElementById('file');
    fileSelector.addEventListener('change', (event) => {
      
      const submit = []
      // event.preventDefault()
      fileList.push(event.target.files);
      // axios.post('http://localhost:5000/upload', {'files':event.target.files})
      // .then(res =>{ console.log(res.data)})
      // .catch(err =>{ console.log('Error: ',err)})
      
      if(fileList[0].length >1){
        const sub = [...fileList[0]]
        // console.log(sub.length)
        sub.map((item,i)=>{
          submit.push({'upload': item,'date': Date().slice(0,25), 'id': location.state._id})
          
          // setFile(prevFile =>[...prevFile, ...submit])
          // console.log(file)
        })
        // setReset([])
        setFile([...submit])
        // console.log(file)
        // submit.map((mfile)=> {console.log(mfile)})
      } 
      else{
        const submission = {'upload': fileList[0][0], 'date': Date().slice(0,25), 'id': location.state._id}
        setFile(submission)
        // console.log(submission)
      }              
    });
  },[])

  const handleSubmit = (e) => {
    // const navigate = useNavigate();
    e.preventDefault()
    // let submission = {}
    

    const formdata = new FormData();
    //       formdata.append('files',file)

    //Setting up the array of files for the backend
    if(!file.length){
      allUploads.push(file)      
    }else{
      file.map((mfile)=> {
        allUploads.push(mfile)
      })
    }

    //Posting to the Backend Array of files
    // allUploads.map(uFile=> {
    //   // console.log(uFile.upload.name)
    //   formdata.append('files',uFile)
    // })
    formdata.append('files',[...fileList])
    console.log(formdata.entries())
    // axios.post('http://localhost:5000/upload', {...formdata},{headers: {"Content-Type": 'multipart/form-data'}})
    //       .then(res =>{ console.log(res.data)})
    //       .catch(err =>{ console.log('Error: ',err)})
    // console.log(formdata)
    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => console.log(data.toString()))
      .catch((err) => console.error(err));

    setReset(allUploads) 
    setFile([])
    
  }
  

  const Deadline =()=>{
    var countDownDate = new Date("Feb 28, 2023 15:52:00").getTime();

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
                <h1 className="h1">{location.state._id}</h1>
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
          
              {
                (reset.length === 0 )?<p className='text-center'>Your submissions will be displayed here...</p>:
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Filename</th>                      
                      <th scope="col">Size</th>
                      <th scope="col">Date Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    (reset.length > 0)?
                      reset.map((el,ind)=>{    
                        // console.log(el.upload)                                     
                        return <tr key={ind}>
                          <th scope="row">{ind}</th>
                          <td>{el.upload.name}</td>                          
                          <td>{el.upload.size}</td>
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