// /pages/api/reply.js
export default async function handler(req, res) {
    if (req.method === "POST") {
      const { message, user_id } = req.body;

      console.log("Recieved in API >>", message,user_id);

  
      try {
        const response = await fetch("http://localhost:3001/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, user_id }),
        });
  
        const contentType = response.headers.get("Content-Type");
       
          if (contentType && contentType.includes("application/json")) {
            // Handle JSON response
            const data = await response.json();
            let resp = { 
              message: data.question || data.message || data.response || "No response received."
          };
          
          // Append options only if they exist
          if (data.options && data.options.length > 0) {
            resp.options = data.options;
          }
          
          res.status(200).json(resp);
            } 
  
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error. Try again later." });
      }
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  