import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from './Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Material = ({resource}) => {
    const [taxonomies, setTaxonomies] = useState([]);

    useEffect(() => {
        if (!resource) {
            return;
        }

        const taxonomyEndpoint = resource._links["wp:term"][0].href;
        axios.get(`${taxonomyEndpoint}`)
            .then((res) => {
                setTaxonomies(res.data);
            })
            .catch((err) => console.log(err))
            
    }, [resource]);

    const renderedTaxonomies= taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/material/${taxonomy.id}`} key={index}>
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

const Resource = () => {
    const [resource, setResource] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const endpoint = `${baseUrl}/resources/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setResource(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, []);

    function getFeaturedImage(resource) {
        if (resource && resource._embedded && resource._embedded['wp:featuredmedia'] && resource._embedded['wp:featuredmedia'][0].source_url) {
            return resource._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150';
        }
    }


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
                title={resource.yoast_head_json?.title || resource.title.rendered}
                description={resource.yoast_head_json?.description}
                image={resource.yoast_head_json?.og_image?.[0]?.url}
                url={window.location.href}
            />
            <div key={resource.slug} className='single-post'>
                <h4 className="title">{resource.title.rendered}</h4>
                <div className='post-tags'>
                    <Material resource={resource} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: resource.content.rendered }} />
                <div>Key: {resource.slug}</div>
            </div>
        </>
    )
}

export default Resource
