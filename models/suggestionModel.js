// models/suggestionModel.js

let suggestions = [];

module.exports = {
  // Function to add a suggestion
  addSuggestion: (suggestionData) => {
    suggestions.push(suggestionData);
    return suggestionData;
  },
  
  // Function to get all suggestions (for testing or later use)
  getAllSuggestions: () => suggestions,
};
