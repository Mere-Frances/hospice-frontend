import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import { getFeaturedImage } from '../components/Campaign';
import he from 'he';
import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Campaigns = () => {
  const [loading, setLoading] = useState(true);
  const [campaigns, setCampaigns] = useState(null);

  const endpoint = `${baseUrl}/campaigns?_embed`;

  useEffect(() => {
    axios
      .get(endpoint)
      .then((res) => {
        setCampaigns(res.data);
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

  const MappedCampaigns = ({ campaigns }) => {
    return campaigns.map((campaign, index) => (
      <div key={campaign.slug + "-" + index} className="single-post-container">
        <img src={getFeaturedImage(campaign)} alt="Post Featured Image" />
        <h4 className="title">{truncateContent(campaign.title.rendered)}</h4>
        <p>{truncateContent(campaign.content.rendered)}</p>
        <a className="primary-button" href={`#/campaigns/${campaign.id}`}>
          Read More...
        </a>
      </div>
    ));
  };

  return (
    <>
      <Seo
        title="Campaigns"
        description="Learn how you can get involved and make a difference."
      />
      <HomeHeader
        desc="Learn how you can get involved and make a difference."
        title="Campaigns"
        image_url="/header-bg-imgs/group.jpg"
        btn="Find out more about hospice"
        btnLink="/"
      />
      <section className="populated-posts">
        {loading ? 
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section> : 
          <div id="homeCont" className="post-container">
          <MappedCampaigns campaigns={campaigns} />
          </div>
        }
      </section>
    </>
  );
};

export default Campaigns;
