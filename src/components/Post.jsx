import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Post = () => {
  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState(null);

  const endpoint = `${baseUrl}/posts/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((response) => {
      setPost(response.data);
      setSeoData(response.data.yoast_head_json);
      setLoading(false);
    })
    .catch((error) => console.log(error))
  }, [id]);

  if (loading) {
    return <>Loading...</>
  }

  // img
  function getFeaturedImage(post) {
    if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    } else {
      return 'https://via.placeholder.com/150';
    }
  }

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{seoData?.title || post.title.rendered}</title>
        {seoData?.description && <meta name="description" content={seoData.description} />}

        {/* Open Graph / Facebook */}
        {seoData?.og_title && <meta property="og:title" content={seoData.og_title} />}
        {seoData?.og_description && <meta property="og:description" content={seoData.og_description} />}
        {seoData?.og_type && <meta property="og:type" content={seoData.og_type} />}
        {seoData?.og_url && <meta property="og:url" content={seoData.og_url} />}
        <meta property="og:image" content={seoData?.og_image?.[0]?.url || getFeaturedImage()} />

        {/* Twitter */}
        {seoData?.twitter_card && <meta name="twitter:card" content={seoData.twitter_card} />}
        {seoData?.twitter_title && <meta name="twitter:title" content={seoData.twitter_title} />}
        {seoData?.twitter_description && <meta name="twitter:description" content={seoData.twitter_description} />}
        <meta name="twitter:image" content={seoData?.twitter_image?.[0]?.url || getFeaturedImage()} />
      </Helmet>

      <div className='container'>
        <h2>Single Post:</h2>
        <div className='post-container'>
          <h4 className='title'>{post.title.rendered}</h4>
          <img src={getFeaturedImage(post)} alt={post.title.rendered + ' profile picture'}/>
          <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
        </div>
      </div>
    </>
  );
}

export default Post
