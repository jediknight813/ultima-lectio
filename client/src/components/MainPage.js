import React from 'react';
import { useSelector } from 'react-redux';

const MainPage = () => {
    const user_id = useSelector((state) => state.user_id);
    console.log(user_id)

    return (
        <div> {user_id} </div>
    )

};

export default MainPage;