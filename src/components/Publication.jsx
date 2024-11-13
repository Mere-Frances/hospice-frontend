import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from './Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Information = ({publication}) => {
    const [taxonomies, setTaxonomies] = useState([]);

    useEffect(() => {
        if (!publication) {
            return;
        }

        const taxonomyEndpoint = publication._links["wp:term"][0].href;
        axios.get(`${taxonomyEndpoint}`)
            .then((res) => {
                setTaxonomies(res.data);
            })
            .catch((err) => console.log(err))
            
    }, [publication]);

    const renderedTaxonomies= taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/information/${taxonomy.id}`} key={index}>
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

const Publication = () => {
    const [publication, setPublication] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const endpoint = `${baseUrl}/publications/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setPublication(res.data);
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
                title={publication.yoast_head_json?.title || publication.title.rendered}
                description={publication.yoast_head_json?.description}
                image={publication.yoast_head_json?.og_image?.[0]?.url}
                url={window.location.href}
            />

            <div key={publication.slug} className='single-post'>
                <h4 className="title">{publication.title.rendered}</h4>
                <div className='post-tags'>
                    <Information publication={publication} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: publication.content.rendered }} />
                <div>Key: {publication.slug}</div>
            </div>
        </>
    )
}

export default Publication
