import Social from "./Social";

const CopyrightFooter = () => {
  return (
    <div className="footer-bottom">
      <div className="auto-container">
        <div className="outer-box">
          <div className="copyright-text">
            © {new Date().getFullYear()} freshers91 by{" "}
            <a
              href="https://www.code91.co"
              target="_blank"
              rel="noopener noreferrer"
            >
             Code91
            </a>
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
