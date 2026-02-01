import exp from 'express'
//how to create a mini express (separate Route) app
export const userApp=exp.Router();
let users=[];

// custom middleware to log request method and url
//create USER API
//get req handling route
userApp.get("/users",(req,res)=>{
   res.status(200).json({message:"all users",payload:users});
});
userApp.post("/users",(req,res)=>{ //middleware2 will be executed only for this route
    let newUser=req.body
    users.push(newUser);
    res.status(201).json({message:"user created"})
});
userApp.put("/users/:id",(req,res)=>{
    //get modified user from req body
    //find the user with id exists in array
    //if user not found, send response as "user not found"
    //if user found, modify the user details
    //send res as "user modified"
    //replace now the user details with modified user details
    //we use splice method to replace the user details
    //index based deletion, update,insertion
    //splice(index,no of elements to delete,elem1,elem2..)

    let modifiedUser=req.body;
    let id = Number(req.params.id);
    let index=users.findIndex((user)=>user.id==id);
    if(index==-1){ //if the index not found it returns -1
        return res.status(404).json({message:"user not found"}); //resource not found then status code is 404
    }
    modifiedUser.id = id; //ensure id remains consistent
    let deletedUser=users.splice(index,1,modifiedUser)
    res.status(200).json({message:"user modified"});
});

//read user by id
userApp.get('/users/:id',(req,res)=>{ //:id is a route parameter and it is a url parameter
    console.log(req.params);
    let id=Number(req.params.id) //returns an object of route parameters
    //{id:100}
    let user=users.find((userObj)=>userObj.id===id)
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    res.status(200).json({message:"user found",payload:user});


});
//delete user by id
userApp.delete("/users/:id",(req,res)=>{
    let id=Number(req.params.id);
    let index=users.findIndex((user)=>user.id===id);
    if(index==-1){
        return res.status(404).json({message:"user not found"});
    }
    let deletedUser=users.splice(index,1);
    res.status(200).json({message:"user deleted",payload:deletedUser});
});