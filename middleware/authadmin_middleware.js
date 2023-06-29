const jwt=require('jsonwebtoken')


module.exports=(request,response,next)=>{
    try{
        //const bearertoken=request.headers.authorization;
        const role=request.headers['role'];

        if(!role){
           return  response.status(403).json({"message":" Invalid"})
        }
        else{
            if(role!="admin"){
                return  response.status(403).json({"message":" Invalid"})
            }
            else{
                console.log(role)
                next()
            }
        }

    }
    catch(error){
        res.status(401).json({
            error: new Error('Invalid request!')
          })
    }
}