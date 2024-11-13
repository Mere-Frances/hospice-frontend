import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import he from 'he';
import Seo from "../components/Seo";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const InitiativeName = ({initiative}) => {
    return (
        <>
            <HomeHeader desc="" title={`${initiative.name} Campaigns`} image_url="/header-bg-imgs/group.jpg" btn="See all campaigns"/>
        </>
    )
}

const AllCampaignsByInitiative = ({params}) => {
    const [campaigns, setCampaigns] = useState([]);

    const endpoint = `${baseUrl}/campaigns?initiative=${params.id}&_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setCampaigns(res.data);
            })
            .catch((err) => console.log(err))
    }, [endpoint]);

    const truncateContent = (content) => {
        const decodedContent = he.decode(content);
        const textOnly = decodedContent.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();
        const firstSentence = textOnly.split(/(?<=[.!?])\s+/)[0];
        return firstSentence + (textOnly.length > firstSentence.length ? "." : "");
    };

    const renderedCampaigns = campaigns.map((campaign, index) => {
        return (
            <div className='single-post-container post-preview' key={index}>
                <Link className='campaign-link' to={`/campaigns/${campaign.id}`}>
                    <h4 className='name'>{truncateContent(campaign.title.rendered)}</h4>
                </Link>
            </div>
        )
    });

    return (
        <>
            {renderedCampaigns}
        </>
    )
}

const Initiative = () => {
    const [loading, setLoading] = useState(true);
    const [initiative, setInitiative] = useState({});
    const params = useParams();

    const initiativeEndpoint = `${baseUrl}/initiative/${params.id}`

    useEffect(() => {
        axios.get(`${initiativeEndpoint}`)
            .then((res) => {
                setInitiative(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [initiativeEndpoint]);

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
                title="Campaign Inititatives"
                description="Discover our Campaign Inititatives."
            />
            <div id='artistsViaGenre' className='page-container'>
                <InitiativeName initiative={initiative} />
                <section className='populated-posts'>
                    <div id="homeCont" className='post-container'>
                        <AllCampaignsByInitiative params={params}/>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Initiative