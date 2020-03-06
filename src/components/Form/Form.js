import React from 'react';
import './Form.scss';

const Form = ({ value, onChange}) => {
	return (
		<div className='form'>
			<input type="text" value={value} placeholder='Search' onChange={onChange} />
            
		</div>
	);
};

export default Form;
