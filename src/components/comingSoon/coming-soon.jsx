export function ComingSoon() {
    const pageStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f8ff',
        color: '#333',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        overflow: 'hidden',
    };

    const headingStyle = {
        fontSize: '3em',
        marginBottom: '20px',
        color: '#ff6347',
        animation: 'bounce 2s infinite',
    };

    const subheadingStyle = {
        fontSize: '1.5em',
        color: '#555',
        animation: 'fadeInUp 3s ease-in-out',
    };

    const keyframes = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
        }
        @keyframes fadeInUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;

    return (
        <div style={pageStyle}>
            <style>{keyframes}</style>
            <h1 style={headingStyle}>Coming Soon</h1>
            <p style={subheadingStyle}>We're working hard to bring you something amazing. Stay tuned!</p>
        </div>
    );
}