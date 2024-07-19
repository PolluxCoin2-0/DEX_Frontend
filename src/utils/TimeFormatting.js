export const TimeFormatting = (timestamp) => {
    const now = Date.now(); // Get the current timestamp in milliseconds
    let inputTime;
  
    if (typeof timestamp === 'string') {
        inputTime = new Date(timestamp).getTime(); // Convert date string to timestamp
    } else if (typeof timestamp === 'number') {
        inputTime = timestamp; // Use the number directly
    } else {
        throw new Error('Invalid timestamp format');
    }
  
    const difference = now - inputTime; // Calculate the difference in milliseconds
    const seconds = Math.floor(difference / 1000); // Convert milliseconds to seconds
  
    if (seconds < 60) {
        return `${seconds} sec ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} min ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hrs ago`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };