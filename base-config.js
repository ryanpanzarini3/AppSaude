// Detectar o base path para funcionar em localhost e GitHub Pages
const getBasePath = () => {
    const path = window.location.pathname;
    
    // Se está em localhost ou file://, usar root
    if (window.location.hostname === 'localhost' || 
        window.location.hostname === '127.0.0.1' || 
        window.location.protocol === 'file:') {
        return './';
    }
    
    // Se está no GitHub Pages, detectar o nome do repositório
    // Formato: /repository-name/
    const parts = path.split('/').filter(p => p);
    
    if (parts.length > 0 && parts[0] !== 'index.html') {
        // Está em um subdiretório
        return `/${parts[0]}/`;
    }
    
    // Caso padrão
    return '/';
};

window.APP_BASE_PATH = getBasePath();
console.log('📍 Base path:', window.APP_BASE_PATH);
