import React from 'react';

import './image-url-form.styles.scss';

const ImageUrlForm = ({onInputChange, onButtonSubmit}) => (
    <div className='image-url-form'>
        <p>This Magic Brain will detect faces in your pictures. Get it a try.</p>
        <div>
            <input onChange={onInputChange} type='text' />
            <button onClick={onButtonSubmit}>Detect</button>
        </div>
    </div>
);

export default ImageUrlForm;