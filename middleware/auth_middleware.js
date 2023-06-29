const jwt=require('jsonwebtoken')


module.exports=(request,response,next)=>{
    try{
        //const bearertoken=request.headers.authorization;
        const bearertoken=request.headers['authorization'];
        const bearer=bearertoken.split(' ')
        console.log(bearer)
        const token=bearer[1]
        console.log(token)

        if(!token){
           return  response.status(403).json({"message":" Invalid"})
        }
        jwt.verify(token,"hybfuqvqbqiuqhuhtger",(error,decoded) => {
            console.log("authenticated")
            if(error){
                response.status(401).send({status:401,message:"unauthorized"})
                return
            }
            next()
        })

    }
    catch(error){
        res.status(401).json({
            error: new Error('Invalid request!')
          })
    }
}