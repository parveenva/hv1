import Social from "./Social";

const CopyrightFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()}  by{" "}
            
            . All Right Reserved.
          </div>
          <div className="social-links">
           </div>
        </div>
      </div>
    </div>
  );
};

export default CopyrightFooter;
