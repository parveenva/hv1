import React, { useState } from 'react';

const HtmlForm = ({ onPreview, onGeneratePdf }) => {
  const [htmlContent, setHtmlContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPreview(htmlContent);
  };

  const handleGeneratePdf = () => {
    onGeneratePdf(htmlContent);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', marginTop: '20px' }}>
      <button type="button" onClick={handleGeneratePdf} style={{ marginBottom: '10px', height: '50px', fontSize: '16px' }}>
        Generate PDF
      </button>
      <button type="submit" style={{ marginLeft: '10px', marginBottom: '10px', height: '50px', fontSize: '16px' }}>
        Preview HTML
      </button>
      <br />
      <textarea
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        rows={100}
        style={{ width: '100%', padding: '8px', border: '2px solid #333', borderRadius: '4px' }}
      />
    </form>
  );
};

export default HtmlForm;
