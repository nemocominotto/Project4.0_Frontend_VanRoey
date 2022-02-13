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
        <div className='container m-auto mb-5'>
            <div className='row py-4 m-0'>
                <h1 className='m-0 p-0'>
                    Tags
                </h1>
            </div>
            {isLoaded && <TagList tags={tags}/>}
            {isLoaded && <Link to='/tag/create' className='m-auto btn btn-outline-info'>Add tag</Link>}
        </div>
    )
};

export default TagIndex;
