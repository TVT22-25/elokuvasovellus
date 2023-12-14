// import React from 'react';
// import './button.css';

// function Button ({ icon, name, color = '#ffffff', bgColor = '#ff3698' }) {
//     return (
//         <a 
//             href="#"
//             className="mainBtn"
//             style={{color: color, background: bgColor}}
//         >
//             {icon} {name}
//         </a>
//     );
// }

// export default Button;

function Button ({ icon, name, color = '#ffffff', bgColor = '#ff3698', onClick }) {
    return (
        <button 
            className="mainBtn"
            style={{color: color, background: bgColor}}
            onClick={onClick}
        >
            {icon} {name}
        </button>
    );
}

export default Button;

