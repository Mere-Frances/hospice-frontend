import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import he from 'he';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Publications = () => {
  const [loading, setLoading] = useState(true);
  const [publications, setPublications] = useState(null);

  const endpoint = `${baseUrl}/publications?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
      .then((res) => {
        setPublications(res.data);
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

  const MappedPublications = ({ publications }) => {
    return publications.map((publication, index) => (
      <div key={publication.slug + "-" + index} className='single-post-container'>
        <h4 className='title'>{truncateContent(publication.title.rendered)}</h4>
        <p>{truncateContent(publication.content.rendered)}</p>
        <a className='primary-button' href={`#/publications/${publication.id}`}>Read More...</a>
      </div>
    ));
  };

  return (
    <>
      <Seo
        title="Publications"
        description="Access our collection of research."
      />
      <HomeHeader desc="Access our collection of research" title="Publications" btn="Find out more about hospice" btnLink="/"/>
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
          <MappedPublications publications={publications}/>
          </div>
        }
      </section>
    </>
  )
}

export default Publications