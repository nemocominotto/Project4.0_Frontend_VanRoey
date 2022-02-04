import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../../api/Api';

const TagList = ({tags}) => {
    const output_tags = tags.map(tag => {
        return (
            <div className='item' key={tag.tagID}>
                <div className='row col-12'>
                    <div className='col-8 col-md-10'>
                        {tag.status ? (
                            <h3 className=''>{tag.address}</h3>
                        ):(
                            <h3 className='inactive'>{tag.address}</h3>
                        )}
                    </div>
                    <div className='col-4 col-md-2 row'>
                        <Link className='col-3 m-auto btn' to={`/tag/edit/${tag.tagID}`}><span className='material-icons'>edit</span></Link>
                        <button className='col-3 m-auto btn' onClick={() => Api.deleteTag(tag.tagID).then(()=>{window.location.reload(false);})}><span className='material-icons'>delete</span></button>
                        {tag.status ? (
                            <p onClick={() => Api.updateTagStatus(tag).then(()=>{window.location.reload(false);})} className='col-3 m-auto btn'><span className='material-icons done'>done</span></p>
                        ): (
                            <p onClick={() => Api.updateTagStatus(tag).then(()=>{window.location.reload(false);})} className='col-3 m-auto btn'><span className='material-icons'>close</span></p>
                        )}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {output_tags}
        </div>
    )
};

export default TagList;
