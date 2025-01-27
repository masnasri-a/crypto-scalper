import { ChevronLeft, ChevronRight, Home, Settings, User } from 'lucide-react';
import { useState } from 'react';
import useMenuStore from '../hook/menu';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeMenu, setActiveMenu] = useState('home');
    const { setSelectedMenu} = useMenuStore();

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const handleMenuClick = (menu: string) => {
        setActiveMenu(menu);
        setSelectedMenu(menu);
    };

    return (
        <div className={`h-screen bg-white flex flex-col items-start ps-5 shadow-lg ${isExpanded ? 'w-64' : 'w-16'}`}>
            <div className="my-5 cursor-pointer" onClick={toggleSidebar}>
                {isExpanded ? <ChevronLeft /> : <ChevronRight />}
            </div>
            <div className={`my-5 cursor-pointer flex items-center gap-2 ${activeMenu === 'home' ? 'text-blue-500' : ''}`} onClick={() => handleMenuClick('home')}>
                <Home />
                {isExpanded && <span className="ml-2">Home</span>}
            </div>
            <div className={`my-5 cursor-pointer flex items-center gap-2 ${activeMenu === 'user' ? 'text-blue-500' : ''}`} onClick={() => handleMenuClick('user')}>
                <User />
                {isExpanded && <span className="ml-2">Account</span>}
            </div>
            <div className={`my-5 cursor-pointer flex items-center gap-2 ${activeMenu === 'settings' ? 'text-blue-500' : ''}`} onClick={() => handleMenuClick('settings')}>
                <Settings />
                {isExpanded && <span className="ml-2">Settings</span>}
            </div>
        </div>
    );
};

export default Sidebar;
