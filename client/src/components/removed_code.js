/*
let user_has_sent_friend_request = true
 

profile_data?.notifications?.forEach(c => {
    if (c.sent_from !== current_user_data?.data?._id && c.type !== "friend_request") {
        user_has_sent_friend_request = false
    }
})

if (user_has_sent_friend_request === false && current_user_data?.data?.friends.includes(profile_data?._id) === false) {
    set_follow_state("Add Friend")
    console.log("Add Friend")
}

profile_data?.notifications?.forEach(e => {
    if(user_has_sent_friend_request === true && e?.request_status === "undecided") {
        set_follow_state("Cancel Friend Request")
        set_notification_id(e?.notification_id)
        console.log("cancel friend request")
    }
}) 

current_user_data?.data?.notifications?.forEach(e => {
    if (e.sent_from === profile_data?._id && e.type === "friend_request" && e?.request_status === "undecided") {
        set_follow_state("Accept")
        set_notification_id(e?.notification_id)
        console.log("Accept")
    }
})

if (profile_data?.friends?.includes(current_user_data?.data?._id)) {
    set_follow_state("Remove Friend")
    console.log("Remove Friend")
}

console.log(follow_state)
*/