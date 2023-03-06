const {client, login, insertContestant,  deleteMember,
    findFirms, insertFirm, findProbationers,
    insertProbationer, insertStudent, findStudents,
     updateContestant, updateProbationer, updateStudent,
    
} = require('./mongodb')

const path = require('path')
const express =require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
// const {PORT, Server_IP}=  require('./src/Constants')
const PORT = process.env.PORT || 5000
const Server_IP = 'localhost'

//GFS Setup Drivers with multer
const fs = require('fs')
const mongo = require('mongodb')
const multer = require('multer')
const { request } = require('http')
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
const multerStorage = multer.diskStorage({
    destination: './upload',
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage: multerStorage})



//Routes
app.get('/firms',async (req,res)=>{
    // await client.connect()
    // const firms = await findFirms(client)
    // res.status(200).send(firms)
    console.log('endpoint reached!')
})

app.get('/probationers',async (req,res)=>{
    await client.connect()
    const probationers = await findProbationers(client)
    res.status(200).send(probationers)
})

app.post('/upload',upload.array('files'), (req,res)=>{
    // console.log(req.body)
    req.files.map(async (up,i)=>{
        // console.log(up.filename)
                
        let param = {userID: req.body.userID[0]}
        let metaFile = {
            date: req.body.date[i],
            contestant: req.body.userID[0],
            filename: up.filename,
            size: up.size,
            encoding: up.encoding,
            mimetype: up.mimetype            
        }       
        const result = await updateContestant(client,param,metaFile)
        console.log(result)

        fs.createReadStream(`./upload/${up.filename}`)
          .pipe(bucket.openUploadStream(up.filename,{
                    chunkSizeBytes: 16* 1024,
                    metadata: up
                })) 
    })
    
    // bucket.openDownloadStreamByName('fwdfwdrinkmorewatercampaigncameroonivorycoast.zip')
    //       .pipe(fs.createWriteStream('./download/fwdfwdrinkmorewatercampaigncameroonivorycoast.zip'))  
    res.json(req.files)
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

        // const token = jwt.sign(user, 'Joe||GIA')
        console.log('login successful!')
        // console.log(out)
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

app.post('/updateprobationer', async (req,res)=>{
    await client.connect()
    let param = {ID: req.body.ID}
    let member = {
        Name: req.body.name,
        Email: req.body.email,
        Office: req.body.office,
        Location: req.body.location,
        Amount: req.body.amount,
        Mobile: req.body.mobile,
        Principal_of_firm: req.body.principal
    }
    const result = await updateProbationer(client,param,member)
    res.send(result)
})

app.post('/updatestudent', async (req,res)=>{
    await client.connect()
    let param = {ID: req.body.ID}
    let member = {
        Name: req.body.name,
        Email: req.body.email,
        Office: req.body.office,
        Location: req.body.location,
        Amount: req.body.amount,
        Mobile: req.body.mobile,
        Principal_of_firm: req.body.principal
    }
    const result = await updateStudent(client,param,member)
    res.send(result)
})



app.post('/insertfirm', async (req,res)=>{
    await client.connect()
    const result = await insertFirm(client,req.body)
    console.log(req.body.Office, ' inserted into the DB!')
    res.send(result)
})

app.post('/insertprobationer', async (req,res)=>{
    await client.connect()
    const result = await insertProbationer(client,req.body)
    console.log(req.body.Name, ' inserted into the DB!')
    res.send(result)
})

app.post('/insertstudent', async (req,res)=>{
    await client.connect()
    const result = await insertStudent(client,req.body)
    console.log(req.body.Name, ' inserted into the DB!')
    res.send(result)
})


app.get('/*',(req,res)=>{
    res.setHeader('Content-Type', 'text/javascript')
    
    res.sendFile(path.resolve(__dirname,'dist','index.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server started on ,${Server_IP}:${PORT}`)
})