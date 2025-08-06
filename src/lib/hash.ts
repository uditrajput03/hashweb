export const getHash = async (message: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message); // Convert string to Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // hash (ArrayBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
// getHash("Hello, World!").then(hash => console.log(hash)); // Example usage
export const getFileHash = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer(); // Read file as ArrayBuffer
  const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer); // Hash it
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert to byte array
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
};
