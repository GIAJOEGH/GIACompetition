const {client, login, insertContestant,  deleteMember,
    findFirms, insertFirm, findProbationers,
    insertProbationer, insertStudent, findStudents,
     updateFirm, updateProbationer, updateStudent,
    
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
// const Grid = require('gridfs-stream')
// const GridFsStorage = require('multer-gridfs-storage')

//middlewares

app.use(express.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname,'out')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//GFS
const db = client.db('Competition')
const bucket = new mongo.GridFSBucket(db,{'bktName': 'compFiles'})
const upload = multer({dest: './upload'})



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

app.post('/upload',upload.array('files'),(req,res)=>{
    console.log(req.files)
    // fs.createReadStream('./upload').pipe(
    // bucket.openUploadStream('test',{
    //         chunkSizeBytes: 1048576,
    //         metadata: { field: 'name', value: 'Joe' }
    //     }))
    // console.log(req.file)
    // console.log(req.body)
    res.json(req.body)
    // res.status(200).send(req.body)
})

app.post('/login',async (req,res)=>{
   try{
    await client.connect()

    const body = req.body
    const out = await login(client,{email: body.email, password: body.password})

    if(out){
        const user = {
            ...out,
            login: 'successful'
        }

        // const token = jwt.sign(user, 'Joe||GIA')
        console.log(out.email,': login successful!')
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
    const result = await insertContestant(client,req.body)
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



app.post('/updatefirm', async (req,res)=>{
    await client.connect()
    let param = {ID: req.body.ID}
    let member = {
        Business_postal: req.body.postal,
        Business_email: req.body.email,
        Office: req.body.name,
        Business_location: req.body.location,
        Amount: req.body.amount,
        Business_mobile: req.body.mobile,
        Principal_of_firm: req.body.principal
    }
    const result = await updateFirm(client,param,member)
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
    res.sendFile(path.resolve(__dirname,'./','index.html'))
})

app.listen(PORT, ()=>{
    console.log(`Server started on ,${Server_IP}:${PORT}`)
})