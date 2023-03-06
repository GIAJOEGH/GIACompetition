const { MongoClient } = require('mongodb');
// const {Server_IP, PORT}= require('./src/Constants')
const uri = `mongodb://localhost:27017`;
// const uri = "mongodb+srv://GIAJoe:giajoe1@cluster0.ocasz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);


async function update(client, apply){ 
    const result = await client.db('Forms').collection('Update').insertOne(apply)
    console.log(result)
}


async function login(client,member){ 
    if(member.email.includes('@gia.com.gh')){
        const juror = await client.db('Competition').collection('Juror').findOne(member)
        const contestants = await client.db('Competition').collection('Contestant').find({})
        const result = {'juror': juror, 'contestant': await contestants.toArray()}
        return result
    }else{
        const result = await client.db('Competition').collection('Contestant').findOne(member)
        return result
    }
}

async function insertProbationer(client, member){
    const result = await client.db('Members').collection('Probationers').insertOne(member)
    // console.log(result)
}

async function insertStudent(client, member){
    const result = await client.db('Members').collection('Students').insertOne(member)
    // console.log(result)
}

async function insertContestant(client, contestant){
    const cursor = await client.db('Competition').collection('Contestant').find({})
    const count = await cursor.toArray()
    let userID = '0000'+(count.length+1)
    console.log(userID.length, userID.length===5)
    if(userID.length === 7){userID = userID.slice(3,7)}
    if(userID.length === 6){userID = userID.slice(2,6)}
    if(userID.length === 5){userID = userID.slice(1,5)}
    userID = 'DYV'+userID
    const result = await client.db('Competition').collection('Contestant').insertOne({...contestant, userID: userID})
    // console.log(count.length)
}


async function updateContestant(client, param, metaFile){
    const result = await client.db('Competition').collection('Contestant').updateOne(
        {userID: param.userID},{
            $push:{submission: metaFile}
            // $set:{...member, Subscription: [{Date: Date(), Amount: member.Amount}]}
        }
    )    
    return result
}
async function updateProbationer(client, param, member){
    const result = await client.db('Members').collection('Probationers').updateOne(
        {ID: param.ID},{
            $set:{...member}
        }
    )
    return result
}
async function updateStudent(client, param, member){
    const result = await client.db('Members').collection('Students').updateOne(
        {ID: param.ID},{
            $set:{...member}
        }
    )
    return result
}

async function insertFirm(client, member){
    const result = await client.db('Members').collection('Firms').insertOne(member)
    console.log(result)
}

async function findProbationers(client){
    const cursor = await client.db('Members').collection('Probationers').find({})
    const result = await cursor.toArray()
    return result
}

async function findStudents(client){
    const cursor= await client.db('Members').collection('Students').find({})
    const result = await cursor.toArray()
    return result
}


async function findFirms(client){
    const cursor = await client.db('Goodstanding').collection('Firms').find({})
    const result = await cursor.toArray()
    return result
}


async function deleteMember(client, param){
    delete param.member._id
    const result = await client.db(param.db).collection(param.collection).deleteOne(param.member)
    console.log(param)
    console.log(result)
}

// main().catch(console.error)

module.exports = {client, login, findProbationers,
    insertContestant, insertProbationer, deleteMember,
    insertFirm, findFirms, insertStudent, findStudents,
    updateContestant, updateProbationer, updateStudent,    
    update,
}