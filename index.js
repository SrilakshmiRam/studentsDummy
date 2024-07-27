const express=require("express")
const app=express()
const cors=require("cors")
const {open}=require("sqlite")
const path=require("path")
const sqlite3=require("sqlite3")

app.use(cors())
app.use(express.json())

const dbpath=path.join(__dirname,"sample.db")

let db=null

const initiateAndStartDatabase=async()=>{
    try{
        db= await open({
            filename:dbpath,
            driver:sqlite3.Database
        })
        app.listen(3000,()=>{
            console.log("Sevrer is running at http://localhost:3000")
        })
    }
    catch(e){
        console.log(`DB ERROR ${e.message}`)
        process.exit(1)
    }
}

initiateAndStartDatabase()


app.get("/students/",async(request,response)=>{
    const dataQuery=`SELECT * FROM student`;
    const templesData=await db.all(dataQuery)
    response.send(templesData)
})