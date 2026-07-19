import { generatePDF } from "../utils/pdfGenerator.js";

export function exportPDF(req,res){

const startup=req.body;

generatePDF(startup,res);

}