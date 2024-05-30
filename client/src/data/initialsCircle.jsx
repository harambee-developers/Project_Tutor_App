import React from 'react';

const getInitials = (name) => {
    let initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    if (initials.length > 2) {
        initials = initials.slice(0, 2);
    }
    return initials;
};

const InitialsCircle = ({ name, size = 50, backgroundColor = 'bg-blue-500', textColor = 'text-white' }) => {
    const initials = getInitials(name);

    const circleClass = `${backgroundColor} ${textColor} rounded-full flex items-center justify-center`;

    const circleStyle = {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2}px`,
        fontWeight: 'bold',
    };

    return (
        <div className={circleClass} style={circleStyle}>
            {initials}
        </div>
    );
};

export default InitialsCircle;
