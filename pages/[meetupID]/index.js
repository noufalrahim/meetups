import MeetupDet from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
function MeetupDetails(props){
    console.log(props.MeetupData)
    return     (
        <Fragment>
    <Head>
            <title>{props.MeetupData.title}</title>
            <meta name="description"
            content={props.MeetupData.description}/>
        </Head>
    <MeetupDet 
    image = {props.MeetupData.image} 
    title = {props.MeetupData.title}
    address = {props.MeetupData.address}
    para = {props.MeetupData.para}/>
    </Fragment>  )
}

export async function getStaticPaths(){
    const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/MeetUps")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();
    return{
        fallback: "blocking",
        paths: meetups.map(meetup => ({
            params: {meetupID: meetup._id.toString()}
        }))
    }
}
export async function getStaticProps(context){
    const meetupId = context.params.meetupID
    const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/MeetUps")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId)
    })
    client.close();
    console.log(selectedMeetup)
    
    return{
    props: {
        MeetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description
        }
    }
}
}
export default MeetupDetails;