import "./css/UserProfileNub.css"
function UserProfileNub(props){

    

    let user = props.userData;
    if(!user){
        return <></>
    }
    
    return(
        <div className="user-profile-nub">      
        {user.first_name} {user.last_name}

        </div>
    )

    

}

export default UserProfileNub