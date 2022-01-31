import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';
import TagList from './TagList';

const TagIndex = () => {
    const [tags, setTags] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        Api.getAllTags().then(res => {
            setTags(res.data);
        }).then(() => {
            setIsLoaded(true);
        })
    }, []);
    

    return (
        <div className='container m-auto mb-5 mt-5'>
            {isLoaded && <TagList tags={tags}/>}
            {isLoaded && <Link to='/tag/create' className='m-auto btn btn-outline-info'>Tag toevoegen</Link>}
        </div>
    )
};

export default TagIndex;
