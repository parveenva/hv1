// pages/api/markdown.js
import fs from "fs";
import path from "path";

export default (req, res) => {
  const { fileName } = req.query;

  if (fileName) {
    // If fileName is provided, return the content of the specific Markdown file
    const markdownDirectory = path.join(process.cwd(), "data/tutorials/java/corejava");
    const filePath = path.join(markdownDirectory, `${fileName}.md`);

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      res.status(200).json({ content });
    } catch (error) {
      console.error(`Error loading Markdown file: ${fileName}.md`, error);
      res.status(500).json({ error: "Markdown content not found" });
    }
  } else {
    // If fileName is not provided, return a list of Markdown files
    const markdownDirectory = path.join(process.cwd(), "data/tutorials/java/corejava");

    try {
      const files = fs.readdirSync(markdownDirectory);
      const markdownFiles = files
        .filter((file) => path.extname(file) === ".md")
        .map((file) => path.parse(file).name);
      res.status(200).json({ markdownFiles });
    } catch (error) {
      console.error("Error listing Markdown files:", error);
      res.status(500).json({ error: "Failed to list Markdown files" });
    }
  }
};
