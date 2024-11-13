import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Seo from './Seo';

const getFeaturedImage = (story) => {
    if (story && story._embedded && story._embedded['wp:featuredmedia'] && story._embedded['wp:featuredmedia'][0].source_url) {
        return story._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
} 

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Subject = ({story}) => {
    const [taxonomies, setTaxonomies] = useState([]);

    useEffect(() => {
        if (!story) {
            return;
        }

        const taxonomyEndpoint = story._links["wp:term"][0].href;
        axios.get(`${taxonomyEndpoint}`)
            .then((res) => {
                setTaxonomies(res.data);
            })
            .catch((err) => console.log(err))
            
    }, [story]);

    const renderedTaxonomies= taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/subject/${taxonomy.id}`} key={index}>
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

const Story = () => {
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    const endpoint = `${baseUrl}/stories/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setStory(res.data);
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
                title={story.yoast_head_json?.title || story.title.rendered}
                description={story.yoast_head_json?.description}
                image={story.yoast_head_json?.og_image?.[0]?.url}
                url={window.location.href}
            />
            <div key={story.slug} className='single-post'>
                <img src={getFeaturedImage(story)} alt="Post Featured Image" />
                <h4 className="title">{story.title.rendered}</h4>
                <div className='post-tags'>
                    <Subject story={story} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: story.content.rendered }} />
                <div>Key: {story.slug}</div>
            </div>
        </>
    )
}

export default Story
