import React, { useState } from 'react';
import HtmlForm from '../components/HtmlForm';

const Home = () => {
  const handleFormPreview = (htmlContent) => {
    // For simplicity, you can open a new window to preview the HTML.
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(htmlContent);
  };

  const handleGeneratePdf = async (htmlContent) => {
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}generate-pdf`, {

         method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ htmlContent }),
      });


      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'preview.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>HTML Form Preview</h1>
      <HtmlForm onPreview={handleFormPreview} onGeneratePdf={handleGeneratePdf} />
    </div>
  );
};

export default Home;
