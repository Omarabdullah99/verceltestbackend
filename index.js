const express= require('express')
const server= express()
const mongoose=require('mongoose')
const cors= require('cors')

const userRouter= require('./routes/UserRoute')
//middleware
server.use(cors())
server.use(express.json())

//router
server.use('/users',userRouter.router)

const MONGODB_URL= "mongodb+srv://moviedekha42:6yHRRoxdl8AU4KXq@passportjs.k96btpv.mongodb.net/?retryWrites=true&w=majority"

main().catch(err => console.log(err))

async function main(){
    await mongoose.connect(MONGODB_URL)
    console.log('database connection')
}
server.get('/',(req,res)=>{
    res.json({status:'success'})
})

server.listen(5000,()=>{
    console.log('server go')
})