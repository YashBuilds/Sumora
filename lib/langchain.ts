import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string) {
  const response = await fetch(fileUrl);          // Fetch the PDF file from the given URL
  const blob = await response.blob();             // Convert the fetched file into a Blob object

  const arrayBuffer = await blob.arrayBuffer();   // Convert Blob into ArrayBuffer (binary data)

  const loader = new PDFLoader(new Blob([arrayBuffer])); // Create a PDFLoader instance with the PDF Blob

  const docs = await loader.load();               // Load and parse the PDF into documents

  // Combine all pages' text content
  return docs.map(doc => doc.pageContent).join("\n");
}
