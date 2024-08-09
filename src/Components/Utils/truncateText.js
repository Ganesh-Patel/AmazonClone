// utils/truncateText.js
export function truncateText(text, wordLimit) {
    const words = text.split(' ');
    if (words.length <= wordLimit) {
      return text;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  export  const formatEmail = (email) => {
    const [username, domain] = email.split("@"); // Split the email into username and domain
    const truncatedUsername = username.length > 6 ? username.substring(0, 6) : username; // Get first 6 letters
    return `${truncatedUsername}...`;
  };
  