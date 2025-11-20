

import { useEffect } from 'react';
import { useLocation } from 'react-router'; 
import { routeTitles } from '../constants/routeTitles';

const usePageTitle = () => {
    const location = useLocation(); 

    useEffect(() => {
        let currentPath = location.pathname; 
        
        if (currentPath.startsWith('/details/')) {
            currentPath = '/details/'; 
        }

        const newTitle = routeTitles[currentPath] || routeTitles['404']; 
        
        document.title = newTitle; 
        
    }, [location.pathname]);
};

export default usePageTitle;