import React from 'react';

const Header = () => {
  const handleScrollToMenu = () => {
    const section = document.getElementById("explore-menu");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      className="position-relative rounded-3 my-4 mx-auto overflow-hidden" id='home'
      style={{
        height: '34vw',
        minHeight: '300px',
        background: `
          linear-gradient(to right, rgba(255, 99, 71, 0.6), rgba(255, 99, 71, 0) 30%),
          url('/header-img.avif')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div 
        className="position-absolute d-flex flex-column text-start gap-3 p-3 p-md-4"
        style={{
          bottom: '10%',
          left: '6vw',
          maxWidth: '90%',
          animation: 'fadeIn 3s'
        }}
      >
        <h2 
          className="text-white fw-medium mb-0" 
          style={{ fontSize: 'clamp(22px, 4.5vw, 36px)' }}
        >
          Order your favorite food here
        </h2>
        <p 
          className="text-white mb-0 d-none d-md-block" 
          style={{ fontSize: 'clamp(12px, 1vw, 16px)' }}
        >
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
        <button 
          className="btn bg-white text-secondary fw-medium rounded-pill border-0 align-self-start mt-2"
          style={{
            padding: 'clamp(8px, 1vw, 12px) clamp(16px, 2.3vw, 24px)',
            fontSize: 'clamp(13px, 1vw, 16px)'
          }}
          onClick={handleScrollToMenu}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;