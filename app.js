const express=require("express");
const app=new express();
const data=require("./hostpital_data.json");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const fs=require("fs");

//get method
app.get("/hospitaldata",(req,res)=>{
    res.send(data);
})

//post method
app.post("/hospitaldata",(req,res)=>{
    data.push(req.body);
    fs.writeFile(`hostpital_data.json`,JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("Failed to add data")
            }
        else{
            res.send("Data Added")
            }
    })
})

//Put method
app.put("/hospitaldata/:name",(req,res)=>{
    let name=req.params.name;
    data.forEach((i)=>{
        if(i.NameOfTheHospital==name){
            i.PatientCount=req.body.PatientCount;
            i.HospitalLocation=req.body.HospitalLocation;
        }
    })
    fs.writeFile(`hostpital_data.json`,JSON.stringify(data),(err,resp)=>{
        if(err){res.send("Failed to update data")}
        else{res.send("Data updated")}
    })
})

//Delete method
app.delete("/hospitaldata/:name",(req,res)=>{
    let name=req.params.name;
    let remaining=data.filter((i=> i.NameOfTheHospital!=name))
    fs.writeFile(`hostpital_data.json`,JSON.stringify(remaining),(err,resp)=>{
        if(err){res.send("Failed")}
        else{res.send("Deleted")}
    })
})

app.listen(3001,()=>{
    console.log("The server is listening to port number 3001");
})