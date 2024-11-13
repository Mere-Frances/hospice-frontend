import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import he from 'he';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Resources = () => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(null);

  const endpoint = `${baseUrl}/resources?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
      .then((res) => {
        setResources(res.data);
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


  const MappedResources = ({ resources }) => {
    return resources.map((resource, index) => (
      <div key={resource.slug + "-" + index} className='single-post-container'>
        <h4 className='title'>{truncateContent(resource.title.rendered)}</h4>
        <p>{truncateContent(resource.content.rendered)}</p>
        <a className='primary-button' href={`#/resources/${resource.id}`}>Read More...</a>
      </div>
    ));
  };

  return (
    <>
      <Seo
        title="Resources"
        description="Find useful resources and tools."
      />
      <HomeHeader desc="Find useful resources and tools" title="Resources" btn="Find out more about hospice" btnLink="/"/>
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
          <MappedResources resources={resources}/>
          </div>
        }
      </section>
    </>
  )
}

export default Resources