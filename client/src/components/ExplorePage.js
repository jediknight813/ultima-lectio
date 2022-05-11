import React, { useState, useEffect } from "react";
import Header from "./Header";
import * as api from '../api/index.js';
import '../styles/ExplorePageStyles.css'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useLocation} from 'react-router-dom';


const ExplorePage = () => {
    const [tags, set_tags] = useState(undefined)
    const navigate = useNavigate()

    useEffect(() => {   
        const fetchData = async () => {
            const { data } = await api.fetchTags()
            if (data !== undefined) {
                data.shift()
                set_tags(data);
            }
        }
        fetchData()
            .catch(console.error);;
        }, [])

    return (
        <div className="explore_page_parent_container">
            <Header />

            {(tags === undefined) && (
                <div style={{"alignSelf": "center", display: "flex", flexDirection: "column", alignItems: "center", color: "white", justifyContent: "center", backgroundColor: '#302f42', width: "100vw", height: "100vh"}}>
                    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                    <h1>Loading..</h1>
                </div>
            )}

            {(tags !== undefined) && (
                <div className="tags_parent_container">
                    <h1 style={{"width": "100%", "display": "flex", "justifyContent": "center", color: "white"}}> Expore Tags </h1>
                    {tags.map((tag) => (
                        <div onClick={() => navigate(`/tags/${tag.trim()}`)} className="tag_container">
                           {"#"+tag.trim()}
                        </div>
                    ))}
                </div>   
            )}

        </div>
    )
}


export default ExplorePage

