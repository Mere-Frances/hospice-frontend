import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const InformationName = ({information}) => {
    return (
        <>
            <HomeHeader desc="" title={`${information.name} Publications`} btn="See all publications"/>

        </>
    )
}

const AllPublicationsByInformation = ({params}) => {
    const [publications, setPublications] = useState([]);

    const endpoint = `${baseUrl}/publications?information=${params.id}&_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setPublications(res.data);
            })
            .catch((err) => console.log(err))
    }, [endpoint]);

    const renderedPublications = publications.map((campaign, index) => {
        return (
            <div className='single-post-container post-preview' key={index}>
                <Link className='campaign-link' to={`/publications/${campaign.id}`}>
                    <h4 className='name'>{campaign.title.rendered}</h4>
                </Link>
            </div>
        )
    });

    return (
        <>
            {renderedPublications}
        </>
    )
}

const Information = () => {
    const [loading, setLoading] = useState(true);
    const [information, setInformation] = useState({});
    const params = useParams();

    const informationEndpoint = `${baseUrl}/information/${params.id}`

    useEffect(() => {
        axios.get(`${informationEndpoint}`)
            .then((res) => {
                setInformation(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [informationEndpoint]);

    
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
                title="Publication Types"
                description="Discover our Publication Types."
            />
            <div className='page-container'>
                <InformationName information={information} />
                <section className='populated-posts'>            
                    <div id="homeCont" className='post-container'>
                        <AllPublicationsByInformation params={params}/>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Information