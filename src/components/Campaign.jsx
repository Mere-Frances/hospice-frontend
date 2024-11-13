import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import he from 'he';
import Seo from './Seo';

export function getFeaturedImage(campaign) {
    if (campaign && campaign._embedded && campaign._embedded['wp:featuredmedia'] && campaign._embedded['wp:featuredmedia'][0].source_url) {
        return campaign._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
} 

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Initiative = ({campaign}) => {
    const [taxonomies, setTaxonomies] = useState([]);

    useEffect(() => {
        if (!campaign) {
            return;
        }

        const taxonomyEndpoint = campaign._links["wp:term"][0].href;
        axios.get(`${taxonomyEndpoint}`)
            .then((res) => {
                setTaxonomies(res.data);
            })
            .catch((err) => console.log(err))
            
    }, [campaign]);

    const renderedTaxonomies= taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/initiative/${taxonomy.id}`} key={index}>
                <span className='taxonomy-term-pill'>
                    {taxonomy.name}
                </span>
            </Link>
        )
    });

    return (
        <div>
            {renderedTaxonomies}
        </div>
    )
}

const Campaign = () => {
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const endpoint = `${baseUrl}/campaigns/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setCampaign(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, []);   

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

    function getFeaturedImage(campaign) {
        if (campaign && campaign._embedded && campaign._embedded['wp:featuredmedia'] && campaign._embedded['wp:featuredmedia'][0].source_url) {
            return campaign._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150';
        }
    } 

    const truncateContent = (content) => {
        const decodedContent = he.decode(content);
        const textOnly = decodedContent.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();
        const firstSentence = textOnly.split(/(?<=[.!?])\s+/)[0];
        return firstSentence + (textOnly.length > firstSentence.length ? "." : "");
    };

    return (
        <>
            <Seo
                title={campaign.yoast_head_json?.title || campaign.title.rendered}
                description={campaign.yoast_head_json?.description}
                image={campaign.yoast_head_json?.og_image?.[0]?.url}
                url={window.location.href}
            />
            <div key={campaign.slug} className='single-post'>
                <img src={getFeaturedImage(campaign)} alt="Post Featured Image" />
                <h4 className="title">{truncateContent(campaign.title.rendered)}</h4>
                <div className='post-tags'>
                    <Initiative campaign={campaign} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: campaign.content.rendered }} />
                <div>Key: {campaign.slug}</div>
            </div>
        </>
    )
}

export default Campaign