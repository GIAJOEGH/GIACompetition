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
    const result = await client.db('Competition').collection('Contestant').findOne(member)
    return result
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
    const result = await client.db('Competition').collection('Contestant').insertOne(contestant)
    // console.log(result)
}


async function updateFirm(client, param, member){
    const result = await client.db('Members').collection('Firms').updateOne(
        {ID: param.ID},{
            $set:{...member}
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
    updateFirm, updateProbationer, updateStudent,    
    update,
}