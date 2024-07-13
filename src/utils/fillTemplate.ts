import { exec } from "child_process";
import { Details } from "../models/PersonalDetails";
const Mustache = require("mustache");
const fs = require("fs");

const template = fs.readFileSync("tex/main.tex", "utf-8");

export const FillTemplate = (data: Details) => {
  const filledTemplate = Mustache.render(template, data);
  fs.writeFileSync("tex/filled_template.tex", filledTemplate);
  return;
};

export const GenerateResume = (rawData: any, outputPath: any) => {
  try {
    FillTemplate(rawData);
    exec(
      "pdflatex -output-directory=tex tex/filled_template.tex",
      (error: any, stdout: any, stderr: any) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          throw new Error("Error while generating resume: " + error.message);
        }
      }
    );
  } catch (error) {
    throw new Error("Error while generating resume");
  }
};
