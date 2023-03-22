const error=(err,req , res,next)=>{
    console.log("EROR HANDLER"=err.stack.red);
    console.log("EROR HANDLER"=err.name);
    if(err.name==="CastError"){
    err.statusCode=400;
    err.message="Буруу бүтэцтэй ID байна";
    }
    res.status(err.statusCode || 500).json({message:err.message});
};
module.exports = error;