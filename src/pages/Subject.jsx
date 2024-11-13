import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const SubjectName = ({subject}) => {
    return (
        <>
            <HomeHeader desc="" title={`${subject.name} Stories`} image_url="/header-bg-imgs/talking-women.jpg" btn="See all stories"/>
        </>
    )
}

const AllStoriesBySubject = ({params}) => {
    const [stories, setStories] = useState([]);

    const endpoint = `${baseUrl}/stories?subject=${params.id}&_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setStories(res.data);
            })
            .catch((err) => console.log(err))
    }, [endpoint]);

    const renderedStories = stories.map((campaign, index) => {
        return (
            <div className='single-post-container post-preview' key={index}>
                <Link className='campaign-link' to={`/stories/${campaign.id}`}>
                    <h4 className='name'>{campaign.title.rendered}</h4>
                </Link>
            </div>
        )
    });

    return (
        <>
            {renderedStories}
        </>
    )
}

const Subject = () => {
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState({});
    const params = useParams();

    const subjectEndpoint = `${baseUrl}/subject/${params.id}`

    useEffect(() => {
        axios.get(`${subjectEndpoint}`)
            .then((res) => {
                setSubject(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [subjectEndpoint]);
    
    
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
            title="Story Subjects"
            description="Discover our Story Subject Subjects."
        />
        <div id='artistsViaGenre' className='page-container'>
            <SubjectName subject={subject} />
            <section className='populated-posts'>
                <div id="homeCont" className='post-container'>
                    <AllStoriesBySubject params={params}/>
                </div>
            </section>
        </div>
        </>
    )
}

export default Subject