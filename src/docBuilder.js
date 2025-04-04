import { Document, Packer, Paragraph, TextRun, MathRun, Math, OfficeMath } from "docx";

export async function generateDocx(htmlBlocks) {
  const doc = new Document({ sections: [] });
  const children = [];

  for (const block of htmlBlocks) {
    // Extract LaTeX equations ($$ ... $$)
    const mathMatches = block.match(/\$\$(.*?)\$\$/g);

    if (mathMatches) {
      for (const latex of mathMatches) {
        const equationText = latex.replace(/\$\$/g, "");

        const math = new Paragraph({
          children: [
            new OfficeMath({
              children: [
                new MathRun(equationText)
              ]
            })
          ]
        });

        children.push(math);
      }
    }

    // Remove HTML and LaTeX to get plain text
    const cleanedText = block.replace(/<[^>]*>/g, '').replace(/\$\$(.*?)\$\$/g, '');
    if (cleanedText.trim().length > 0) {
      children.push(new Paragraph(cleanedText));
    }
  }

  doc.addSection({ children });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "chatgpt_output.docx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
