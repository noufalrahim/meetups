import { MongoClient } from "mongodb";
async function handler(req,res){
    if(req.method === "POST") {
        const data = req.body;
        const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/MeetUps")
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result =  await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: "MeetUp inserted"})
    }   
 }
export default handler;