import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import { getFeaturedImage } from '../components/Campaign';
import he from 'he';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Updates = () => {
  const [loading, setLoading] = useState(true);
  const [updates, setUpdates] = useState(null);

  const endpoint = `${baseUrl}/updates?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
      .then((res) => {
        setUpdates(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const truncateContent = (content) => {
    const decodedContent = he.decode(content);
    const textOnly = decodedContent.replace(/<\/?[^>]+(>|$)/g, "").replace(/\s+/g, " ").trim();
    const firstSentence = textOnly.split(/(?<=[.!?])\s+/)[0];
    return firstSentence + (textOnly.length > firstSentence.length ? "." : "");
  };


  const MappedUpdates = ({ updates }) => {
    return updates.map((update, index) => (
      <div key={update.slug + "-" + index} className='single-post-container'>
        <img src={getFeaturedImage(update)} alt="Post Featured Image" />
        <h4 className='title'>{truncateContent(update.title.rendered)}</h4>
        <p>{truncateContent(update.content.rendered)}</p>
        <a className='primary-button' href={`#/updates/${update.id}`}>Read More...</a>
      </div>
    ));
  };

  return (
    <>
      <Seo
        title="News"
        description="Stay informed with the latest news, updates, and events."
      />
      <HomeHeader desc="Stay informed with the latest news, updates, and events" title="News" image_url="/header-bg-imgs/phone.jpg" btn="Find out more about hospice" btnLink="/"/>
      <section className='populated-posts'>
      {loading ? 
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section> : 
          <div id="homeCont" className="post-container">
          <MappedUpdates updates={updates}/>
          </div>
        }
      </section>
    </>
  )
}

export default Updates