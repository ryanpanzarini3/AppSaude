
const getBasePath = () => {
    const path = window.location.pathname;
    

    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.protocol === 'file:') {
        return './';
    }
    
  
    const parts = path.split('/').filter(p => p);
    
    if (parts.length > 0 && parts[0] !== 'index.html') {

        return `/${parts[0]}/`;
    }
    

    return '/';
};

window.APP_BASE_PATH = getBasePath();
console.log('📍 Base path:', window.APP_BASE_PATH);

