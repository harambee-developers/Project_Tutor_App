import React from 'react';
import './initialsCircle.css'

const getInitials = (name) => {
    let initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
    if (initials.length > 2) {
        initials = initials.slice(0, 2);
    }
    return initials;
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const InitialsCircle = ({ name, size = 50, textColor = 'white' }) => {
    const initials = getInitials(name);
    const backgroundColor = getRandomColor();

    const circleStyle = {
        backgroundColor,
        color: textColor,
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2}px`,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
    };

    return (
        <div className="initials-circle" style={circleStyle}>
            {initials}
        </div>
    );
};

export default InitialsCircle;
