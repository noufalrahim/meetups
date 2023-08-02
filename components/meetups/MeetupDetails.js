import classes from "./MeetupDet.module.css"
function MeetupDet(props){
    return(
    <section className={classes.detail}>
    <img src={props.image} alt="" />
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.para}</p>
    </section>
    )
    
}
export default MeetupDet;