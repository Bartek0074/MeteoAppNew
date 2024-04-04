export  const scrollToContent = () => {
    const forecastEl = document.getElementById('content');
    if (forecastEl) {
        forecastEl.scrollIntoView({ behavior: 'smooth' });
    }
};