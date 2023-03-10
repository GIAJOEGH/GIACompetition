const { MongoClient } = require('mongodb');
// const {Server_IP, PORT}= require('./src/Constants')
// const uri = `mongodb://localhost:27017`;
const uri = "mongodb+srv://GIAJoe:giajoe1@cluster0.ocasz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri);


async function update(client, apply){ 
    const result = await client.db('Forms').collection('Update').insertOne(apply)
    console.log(result)
}


async function login(client,member){ 
    if(member.email.includes('@gia.com.gh') && member.email.includes('juror')){ 
        const juror = await client.db('Competition').collection('Juror').findOne(member)
        const contestants = await client.db('Competition').collection('Contestant').find({})
        delete juror.password
        const result = {'juror': juror, 'contestant': await contestants.toArray()}
        return result
    }else{  
        const result = await client.db('Competition').collection('Contestant').findOne(member)
        delete result.password
        return result
    }
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
    const cursor = await client.db('Competition').collection('Contestant').find({userID: param.userID})
    const count = await cursor.toArray()   
    // console.log(count, param.userID)
    return count
}

async function deleteMember(client, param){
    delete param.member._id
    const result = await client.db(param.db).collection(param.collection).deleteOne(param.member)
    console.log(param)
    console.log(result)
}

// main().catch(console.error)

module.exports = {client, login, 
    insertContestant,  deleteMember,
    updateContestant,    
    update,
}