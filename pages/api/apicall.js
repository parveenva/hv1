import fetch from "node-fetch";
 
export default async function handler(req, res) {
  const { endpoint } = req.query;

  if (!endpoint) {
    return res.status(400).json({ error: "Missing 'endpoint' query parameter" });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

  // Build the complete API endpoint URL using the baseUrl and endpoint from the query parameter
 
  try {
    if (req.method === "GET") {
      // Handle GET request
    
      console.error("method is GET fetching data:");

      const response = await fetch(apiUrl);
      const data = await response.json();
      res.status(200).json(data);
    } else if (req.method === "POST") {
      console.error("method is POST fetching data:");

      // Handle POST request
      const requestData = req.body; // Assuming the frontend has sent JSON data in the request body
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const data = await response.json();
      res.status(200).json(data);
    }
    else if (req.method === "PUT") {
      console.error("method is PUT fetching data:");

      // Handle POST request
      const requestData = req.body; // Assuming the frontend has sent JSON data in the request body
      const headersFromRequest = req.headers; // Get headers from the request

      console.error("method is PUT fetching data:");

      
      const response = await fetch(apiUrl, {
        method: "PUT",
           headers: headersFromRequest, // Pass the same headers
         body: JSON.stringify(requestData),
      });
      const data = await response.json();
      res.status(200).json(data);
    }    
    else {
      // For other request types, return an error
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error fetching ---------:", error);
    if (error instanceof SyntaxError) {
    //  console.log("Response body:", await response.text());
    }
    res.status(500).json({ error: "Error fetching data" });
  }
  
}