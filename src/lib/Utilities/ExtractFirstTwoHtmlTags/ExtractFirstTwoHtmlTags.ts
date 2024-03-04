export const ExtractFirstTwoHtmlTags = (html: string): string => {
  // Regex to find HTML tags and their content
  const regex = /(<[^>]+>.*?<\/[^>]+>)/gs;

  // Apply regex to find matches
  let matches = html.match(regex);

  // Check if we have at least two matches
  if (matches && matches.length >= 2) {
    // Return the first two matches joined
    return `${matches.slice(0, 2).join(' ')}`;
  } else if (matches && matches.length === 1) {
    // If only one match found, return it
    return matches[0];
  } else {
    // If no matches found, return an empty string or some default message
    return '...';
  }
};
