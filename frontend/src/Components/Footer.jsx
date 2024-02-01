import React, { useEffect, useState } from 'react';
import '../stylesheets/footer.css';
const Footer = () => {
    const [isFooterFixed, setIsFooterFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const bodyHeight = document.body.clientHeight;
            setIsFooterFixed(bodyHeight < windowHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`footer ${isFooterFixed ? 'fixed' : ''}`}>
            Hello
        </div>
    );
}
export default Footer