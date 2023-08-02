import MeetupList from "@/components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props) {

    return(
        <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name="description"
            content="Browse a huge list of highly active React Meetups" />
        </Head>
        <MeetupList meetups={props.meetups} />
        </Fragment>

    )
}
export async function getStaticProps(){   // runs on server
    const client = await MongoClient.connect("mongodb+srv://projectmail0444:Project_Mail1@cluster0.tw00wpr.mongodb.net/MeetUps")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return { 
        props:{
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
}

// FUNCTION TO USE IF DATA CHANGES FOR EVERY REQUESTS

// export async function getServerSideProps(context){  //RUNS AFTER DEPLOYMENT ON SERVER
//     const req = context.req;
//     const res = context.res
//     return{
//         props:{
//             meetups: DUMMY_MEETUPS
//         }
//     };
// }
export default HomePage;