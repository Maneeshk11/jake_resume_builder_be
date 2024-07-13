import express, { Request, Response } from "express";
import helmet from "helmet";
import { GenerateResume } from "./utils/fillTemplate";
import { Details } from "./models/PersonalDetails";
const fs = require("fs");
var cors = require("cors");
const path = require("path");

const port = 17080;
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));



app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "online" });
});


app.post("/generateResume", (req: Request, res: Response) => {
  const rawData: Details = req.body.data;
  const outputPath = path.resolve(__dirname, "..", 'tex', 'filled_template.pdf');

  try {
    GenerateResume(rawData, outputPath);
    setTimeout(() => {
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Cache-Control': 'no-cache'
      });
      res.sendFile(outputPath, (err) => {
        if (err) {
          console.error(`Error sending PDF: ${err}`);
          res.status(500).send("Error generating PDF");
        } else {
          // Clean up the temporary files
          fs.unlinkSync(outputPath);
          fs.unlinkSync(path.resolve(__dirname, "..", "tex", "filled_template.tex"));
          fs.unlinkSync(path.resolve(__dirname, "..", "tex", "filled_template.log"));
          fs.unlinkSync(path.resolve(__dirname, "..", "tex", "filled_template.aux"));
          fs.unlinkSync(path.resolve(__dirname, "..", "tex", "filled_template.out"));
        }
      });
    }, 3000);
  } catch (error: any) {
    res.status(500).json({ message: "Error generating resume: " + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
