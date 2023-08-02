import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
function NewMeetup(){
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData) {
        const resp = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(enteredMeetupData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await resp.json();
        console.log(data);
        router.push("/")

    }
    return (
    <Fragment>
        <Head>
            <title>Add a new Meetup</title>
            <meta name="description"
            content="Add your own meetups and create amazing networking opportunities" />
        </Head>
        <NewMeetupForm onAddMeetup = {addMeetupHandler}/>
    </Fragment>)
}


export default NewMeetup;