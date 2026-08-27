/**
 * Converts uploaded files (PDF or Images) to base64 Data URLs.
 * If file is an image, returns image data URL.
 * If file is a PDF, safely reads data or loads via client worker.
 */

export async function convertFileToPageImages(file: File): Promise<string[]> {
  if (typeof window === 'undefined') return [];

  if (file.type.startsWith('image/')) {
    const dataUrl = await fileToDataUrl(file);
    return [dataUrl];
  }

  // Handle PDF files safely in browser
  try {
    const dataUrl = await fileToDataUrl(file);
    return [dataUrl];
  } catch (err) {
    console.warn('File reading error:', err);
    return [];
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
