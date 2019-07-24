// implement your API here

const express = require('express');
const db = require('./data/db.js')

const server = express();

server.use(express.json());


server.get('/api/users', (request,response)=>{
    db.find()
    .then(hubs => {
        response.status(200).json(hubs);
    })
    .catch(err =>{
        response.status(500).json({success:false, err})
    })
})

server.get('/api/users/:id', (request,response)=> {
    const {id} = request.params;
    db.findById(id)
    .then(user =>{
        if(user){
            response.status(200).json(user);
        } else {
            response.status(404).json({success:false, message: "The user with the specified ID does not exist."})
        }
    })
})


server.post('/api/users', (request,response) =>{
    const userInfo = request.body;
    console.log(userInfo);
    db.insert(userInfo)
    .then(user => {
        response.status(201).json({success:true,user})//201 is standard
    })
    .catch(err =>{
        response.status(500).json({success:false, err})
    });
})

//DELETE, note the : before id to signify templatized location
server.delete('/hubs/:id', (request, response) =>{
    // We need something in the form of /hubs/{id} where id = id of object to be deleted
    const {id} = request.params;
    db.remove(id)
    .then(deleted => {
        if(deleted){
            response.status(204).end(); //end method = response method that tells us to send 204 and do nothing
        } else {
            response.status(404).json({success: false, message:"I cannot find the hub you are looking for"}) //404 = DNE, does not exist
        }
    })
    .catch(err => {
        response.status(500).json({success:false,err});
    })
})

//UPDATE = put, note the : before id to signfy templatized location
server.put('/hubs/:id',(request, response)=>{
    const {id} = request.params;
    const hubInfo = request.body;
    console.log(hubInfo, id);
    db.update(id, hubInfo)
    .then(updated => {
        if(updated){
            response.status(200).json({success:true,updated});
        } else {
            response.status(404).json({success:false,message: "I cannot find the hub you were looking for"});
        }
    })
    .catch(err => {
        response.status(500).json({success:false, err}) //catch --> Catastrophic error
    });
})

server.listen(4000,()=>{
    console.log('server listening on port 4000');
})