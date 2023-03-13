const {client, login, insertContestant,  deleteMember,    
     updateContestant, 
    
} = require('./mongodb')

const path = require('path')
const express =require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const {PORT, Server_IP}=  require('./src/Constants')
const PORT = process.env.PORT || 10000
const Server_IP = 'localhost'

//GFS Setup Drivers with multer
const fs = require('fs')
const mongo = require('mongodb')
const multer = require('multer')
const streamifier = require('streamifier')
// const Grid = require('gridfs-stream')
// const GridFsStorage = require('multer-gridfs-storage')

//middlewares

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname,'dist'),{extensions: ["js","jsx"]}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//GFS
const db = client.db('Competition')
const bucket = new mongo.GridFSBucket(db,{'bktName': 'compFiles'})
// const multerStorage = multer.diskStorage({
//     destination: './upload',
//     filename: (req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })

const multerStorage = multer.memoryStorage({
    destination: (req,file,cb)=>{
                // console.log(file)
                cb(null,file)
            }
})

const upload = multer({storage: multerStorage})
// const bufferToStream =(myBuffer)=> {
//     let tmp = new Duplex();
//     tmp.push(myBuffer);
//     tmp.push(null);
//     return tmp;
// }


//Routes

app.post('/upload',upload.array('files'),async (req,res)=>{
    // console.log(req.body, req.files.length)
    // console.log(req.files, req.body)

    if(req.files.length > 1){
        try{
            req.files.map(async (up,i)=>{
                // console.log(req.body.date[i])
                        
                let param = {userID: req.body.userID[0]}           
                     
                const result = await updateContestant(client,param,{...up,date: req.body.date[i]})  
                console.log(up)
                if((req.files.length-1 )=== i){
                    // console.log(result)
                    delete result[0].password
                    req.body = [] //reset the body before the next upload
                    res.send(...result)
                }
        
                // fs.createReadStream(__dirname`./upload/${up.orignalname}`)
                //   .pipe(bucket.openUploadStream(up.orignalname,{
                //             chunkSizeBytes: 16* 1024,
                //             metadata: up
                //         })) GIA2023Comp
                streamifier.createReadStream(up.buffer)
                  .pipe(bucket.openUploadStream(up.orignalname,{
                            chunkSizeBytes: 8* 1024,
                            metadata: up
                        })) 
                
            })
        }catch(e){console.log('Error reading multiple files')}
        
    }else{
        // console.log(req.files[0], req.files[0].filename)
        try{
            let param = {userID: req.body.userID}
        
            const result = await updateContestant(client,param,{...req.files[0],date: req.body.date})
            // console.log(req.files[0])
            // fs.createReadStream(path.resolve(__dirname,`./upload/${req.files[0].filename}`))
            //       .pipe(bucket.openUploadStream(req.files[0].filename,{
            //                 chunkSizeBytes: 16* 1024,
            //                 metadata: req.files[0]
            //             })) 
            // fs.createReadStream(`${req.files[0].orignalname}`, 'binary')
            //       .pipe(bucket.openUploadStream(req.files[0].orignalname,{
            //                 chunkSizeBytes:  16* 1024,
            //                 metadata: req.files[0]
            //             }))
            // console.log(bufferToStream(req.files[0].buffer))
            streamifier.createReadStream(req.files[0].buffer)
            .pipe(bucket.openUploadStream(req.files[0].orignalname,{
                chunkSizeBytes: 16* 1024,
                metadata: req.files[0]
            }))

            delete result[0].password
            req.body = [] //reset the body before the next upload
            res.send(...result)
        }catch(e){console.log('Error reading file')}
        
    }
    
    // bucket.openDownloadStreamByName('fwdfwdrinkmorewatercampaigncameroonivorycoast.zip')
    //       .pipe(fs.createWriteStream('./download/fwdfwdrinkmorewatercampaigncameroonivorycoast.zip'))  
    // console.log(result)
    // res.status(200).send(result[result.length])
})

app.post('/login',async (req,res)=>{
   try{
    await client.connect()

    const body = req.body
    // const out = await login(client,{email: body.email, password: body.password})
    const out = await login(client,{email: body.email, password: body.password})

    if(out){
        const user = {
            ...out,
            login: 'successful'
        }
        // console.log(out.juror.email)
        // const token = jwt.sign(user, 'Joe||GIA')
        if(out.juror){
            console.log(out.juror.email, 'login successful!')
        }else{console.log(out.email, 'login successful!')}
        
        // res.status(200).send({token})
        res.status(200).send({user})
    }else{
        res.status(200).send({login: 'failed login, try again or contact admin!'})
        console.log('login failed!', body)}
   }catch(err){
       console.log(err)
   }
})

app.post('/register',async (req,res)=>{
    await client.connect()
    const result = await insertContestant(client,{submission: [],...req.body})
    console.log('Signup: ',req.body.email, Date())
    res.send({'status':'successful',result})
})

app.post('/delete', async (req,res)=>{
    await client.connect()
    let param = req.body
    console.log(param.member.Name,' is delete from the collection ', param.collection)
    const result = await deleteMember(client,param)
    res.send(result)
})



app.post('/updatecontestant', async (req,res)=>{
    await client.connect()
    let param = {userID: req.body.userID}
    let submission = [...req.files]
    const result = await updateContestant(client,param,member)
    // console.log(req.body.Name, ' updated into the DB!')
    // console.log(member)
    res.send(result)
})


app.get('/*',(req,res)=>{
    res.setHeader('Content-Type', 'text/javascript')
    
    res.sendFile(path.resolve(__dirname,'dist','index.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server started on ,${Server_IP}:${PORT}`)
})