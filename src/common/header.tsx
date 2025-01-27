import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <header className="flex justify-between items-center p-4 bg-white text-neutral-800">
            <h1 className="text-xl">Crypto Scalper</h1>
            <div className="text-lg">{currentTime.toLocaleTimeString()}</div>
        </header>
    );
};

export default Header;