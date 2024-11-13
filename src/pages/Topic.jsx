import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const TopicName = ({topic}) => {
    return (
        <>
            <HomeHeader desc="" title={`${topic.name} News`} image_url="/header-bg-imgs/phone.jpg" btn="See all news"/>
        </>
    )
}

const AllUpdatesByTopic = ({params}) => {
    const [updates, setUpdates] = useState([]);

    const endpoint = `${baseUrl}/updates?topic=${params.id}&_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setUpdates(res.data);
            })
            .catch((err) => console.log(err))
    }, [endpoint]);

    const renderedUpdates = updates.map((update, index) => {
        return (
            <div className='single-post-container post-preview' key={index}>
                <Link className='update-link' to={`/updates/${update.id}`}>
                    <h4 className='name'>{update.title.rendered}</h4>
                </Link>
            </div>
        )
    });

    return (
        <>
            {renderedUpdates}
        </>
    )
}

const Topic = () => {
    const [loading, setLoading] = useState(true);
    const [topic, setTopic] = useState({});
    const params = useParams();

    const topicEndpoint = `${baseUrl}/topic/${params.id}`

    useEffect(() => {
        axios.get(`${topicEndpoint}`)
            .then((res) => {
                setTopic(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [topicEndpoint]);

    
    if (loading) {
        return <>
            <section className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </section>
        </>
    }
    
    return (
        <>
        <Seo
            title="News topics"
            description="Discover our News topics."
        />
        <div className='page-container'>
            <TopicName topic={topic} />
            <section className='populated-posts'>
                <div id="homeCont" className='post-container'>
                    <AllUpdatesByTopic params={params}/>
                </div>
            </section>
        </div>
        </>
    )
}

export default Topic