import { Routes, Route} from 'react-router-dom'

// pages
import Campaigns from '../pages/Campaigns';
import Campaign from './Campaign';
import Initiative from '../pages/Initiative';

import Updates from '../pages/Updates';
import Update from './Update';
import Topic from '../pages/Topic';

import Donate from '../pages/Donate';
import Home from '../pages/Home';
import ProductList from './ProductList'

import Publications from '../pages/Publications';
import Publication from './Publication';
import Type from '../pages/Type';

import Resources from '../pages/Resources';
import Resource from './Resource';
import Material from '../pages/Material';

import Stories from '../pages/Stories';
import Story from './Story';
import Subject from '../pages/Subject';

// components
import Post from './Post';

const Links = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/campaigns' element={<Campaigns/>}/>
            <Route path='/updates' element={<Updates/>}/>
            <Route path='/donate' element={<Donate/>}/>
            <Route path='/publications' element={<Publications/>}/>
            <Route path='/resources' element={<Resources/>}/>
            <Route path='/stories' element={<Stories/>}/>
            {/* pages */}
            <Route path='/post/:id' element={<Post/>}/>
            <Route path='/campaigns/:id' element={<Campaign/>}/>
            <Route path='/updates/:id' element={<Update/>}/>
            <Route path='/publications/:id' element={<Publication/>}/>
            <Route path='/resources/:id' element={<Resource/>}/>
            <Route path='/stories/:id' element={<Story/>}/>
            {/* relatives */}
            <Route path='/initiative/:id' element={<Initiative/>}/>
            <Route path='/topic/:id' element={<Topic/>}/>
            <Route path='/information/:id' element={<Type/>}/>
            <Route path='/material/:id' element={<Material/>}/>
            <Route path='/subject/:id' element={<Subject/>}/>
            {/* Shop Page */}
            <Route path='/shop' element={<ProductList/>}/>
        </Routes>
    )
}

export default Links