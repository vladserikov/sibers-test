import React from 'react';
import './Popup.scss';

const Popup = ({ data, onClose, onSubmit}) => {
	const obj = {...data};
	// console.log(obj);
    
	return (
		<div className='popup'>
			<div className="children">
				<button className='close' onClick={onClose}>X</button>
				<form onSubmit={onSubmit(obj)}>
					<h2>Enter data to change</h2>
					<label>
						<span>{data.name}</span>
						<input type="text" name='name'/>
					</label>
					<label>
						<span>{data.username}</span>
						<input type="text" name='username'/>
					</label>
					<label>
						<span>{data.phone}</span>
						<input type="text" name='phone'/>
					</label>
					<label>
						<span>{data.email}</span>
						<input type="text" name='email'/>
					</label>
					<label>
						<span>{data.website}</span>
						<input type="text" name='website'/>
					</label>
					<button>Submit</button>
				</form>

			</div>
		</div>
	);
};

export default Popup;
