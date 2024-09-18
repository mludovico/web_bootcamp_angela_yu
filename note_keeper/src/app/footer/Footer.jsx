import React from 'react';

export default function Footer() {
    return <div className="footer">
        <p>© {new Date().getFullYear()} Note Keeper</p>
    </div>;
}