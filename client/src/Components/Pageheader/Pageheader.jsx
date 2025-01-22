import './Pageheader.css';

const Pageheader = ({ title, subtitle, style = 'modern-gradient' }) => {
  const backgroundImage = "https://res.cloudinary.com/dyqbbdguz/image/upload/v1737581612/pexels-marta-wave-5876827_1_dfwvct.jpg";
  
  return (
    <header 
      className={`page-header ${style}`}
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      <div className="header-content">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
};

export default Pageheader; 

