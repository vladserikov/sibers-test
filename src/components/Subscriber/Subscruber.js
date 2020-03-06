import React from 'react'
import './Subscriber.scss'

const Subscruber = ({ data, onChangeData, firstLetter }) => {
    const phone = data.phone.replace(/\.|\) /g, '-').replace('(', '')

    const renderFirstLetter = () => (
        <div className="first-letter">
            {data.name[0]}
        </div>
    )
    
    return (
        <>
            <div className='subscruber'>
                {firstLetter ? renderFirstLetter() : null}
                <div className="avatar">
                    <img src={data.avatar} alt="avatar" className='avatar-img' />
                </div>
                <div className="info">
                    <h3>{data.name}</h3>
                    <span>{data.dataname}</span>
                    <span>{data.email}</span>
                    <span>Phone: {phone}</span>
                    <span>Website: {data.website}</span>
                </div>
                <button onClick={onChangeData}>Edit</button>
            </div>
        </>
    )
}

export default Subscruber
