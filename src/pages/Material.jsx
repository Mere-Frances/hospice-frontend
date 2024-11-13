import {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import HomeHeader from '../components/HomeHeader';
import Seo from "../components/Seo";


const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const MaterialName = ({material}) => {
    return (
        <>
            <HomeHeader desc="" title={`${material.name} Resources`} btn="See all resources"/>
        </>
    )
}

const AllResourcesByMaterial = ({params}) => {
    const [resources, setResources] = useState([]);

    const endpoint = `${baseUrl}/resources?material=${params.id}&_embed`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setResources(res.data);
            })
            .catch((err) => console.log(err))
    }, [endpoint]);

    const renderedResources = resources.map((campaign, index) => {
        return (
            <div className='single-post-container post-preview' key={index}>
                <Link className='campaign-link' to={`/resources/${campaign.id}`}>
                    <h4 className='name'>{campaign.title.rendered}</h4>
                </Link>
            </div>
        )
    });

    return (
        <>
            {renderedResources}
        </>
    )
}

const Material = () => {
    const [loading, setLoading] = useState(true);
    const [material, setMaterial] = useState({});
    const params = useParams();

    const materialEndpoint = `${baseUrl}/material/${params.id}`

    useEffect(() => {
        axios.get(`${materialEndpoint}`)
            .then((res) => {
                setMaterial(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))
    }, [materialEndpoint]);

    
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
            title="Resource Materials"
            description="Discover our Resource Materials."
        />
        <div className='page-container'>
            <MaterialName material={material} />
            <section className='populated-posts'>
                <div id="homeCont" className='post-container'>
                    <AllResourcesByMaterial params={params}/>
                </div>
            </section>

        </div>
        </>
    )
}

export default Material