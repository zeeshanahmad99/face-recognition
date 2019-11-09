import React from 'react';

import './rank.styles.scss';

const Rank = ({user}) => (
    <div className='rank'>
        {user.name} your rank is... {user.entries}
    </div>
);

export default Rank;