import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import { getFeaturedImage } from '../components/Campaign';
import he from 'he';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Stories = () => {
  const [loading, setLoading] = useState(true);
  const [stories, setStories] = useState(null);

  const endpoint = `${baseUrl}/stories?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
      .then((res) => {
        setStories(res.data);
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


  const MappedStories = ({ stories }) => {
    return stories.map((story, index) => (
      <div key={story.slug + "-" + index} className='single-post-container'>
        <img src={getFeaturedImage(story)} alt="Post Featured Image" />
        <h4 className='title'>{truncateContent(story.title.rendered)}</h4>
        <p>{truncateContent(story.content.rendered)}</p>
        <a className='primary-button' href={`#/stories/${story.id}`}>Read More...</a>
      </div>
    ));
  };

  return (
    <>
      <Seo
        title="Stories"
        description="Read our inspiring stories."
      />
      <HomeHeader desc="Read our inspiring stories" title="Stories" image_url="/header-bg-imgs/talking-women.jpg" btn="Find out more about hospice" btnLink="/"/>
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
          <MappedStories stories={stories}/>
          </div>
        }
      </section>
    </>
  )
}

export default Stories