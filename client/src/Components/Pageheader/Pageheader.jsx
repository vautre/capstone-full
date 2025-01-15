import '../styles/Pageheader.css';

const Pageheader = ({ title, subtitle, backgroundImage }) => {
  return (
    <header 
      className="page-header"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`
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