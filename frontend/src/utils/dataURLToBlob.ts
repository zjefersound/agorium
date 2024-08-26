export async function dataURLtoBlob(dataURL: string) {
  try {
    // Fetch the Blob from the Blob URL
    const response = await fetch(dataURL);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error(`Failed to fetch blob for ${dataURL}:`, error);
  }
}
