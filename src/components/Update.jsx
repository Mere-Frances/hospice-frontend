import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from './Seo';

const getFeaturedImage = (update) => {
    if (update && update._embedded && update._embedded['wp:featuredmedia'] && update._embedded['wp:featuredmedia'][0].source_url) {
        return update._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
};

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Topic = ({update}) => {
    const [taxonomies, setTaxonomies] = useState([]);

    useEffect(() => {
        if (!update) {
            return;
        }

        const taxonomyEndpoint = update._links["wp:term"][0].href;
        axios.get(`${taxonomyEndpoint}`)
            .then((res) => {
                setTaxonomies(res.data);
            })
            .catch((err) => console.log(err))
            
    }, [update]);

    const renderedTaxonomies= taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/topic/${taxonomy.id}`} key={index}>
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

const Update = () => {
    const [update, setUpdate] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const endpoint = `${baseUrl}/updates/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setUpdate(res.data);
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

    return (
        <>
            <Seo
                title={update.yoast_head_json?.title || update.title.rendered}
                description={update.yoast_head_json?.description}
                image={update.yoast_head_json?.og_image?.[0]?.url}
                url={window.location.href}
            />

            <div key={update.slug} className='single-post'>
                <img src={getFeaturedImage(update)} alt="Post Featured Image" />
                <h4 className="title">{update.title.rendered}</h4>
                <div className='post-tags'>
                    <Topic update={update} />
                </div>          
                <div dangerouslySetInnerHTML={{ __html: update.content.rendered }} />
                <div>Key: {update.slug}</div>
            </div>
        </>
    )
}

export default Update
