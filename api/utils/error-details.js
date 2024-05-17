module.exports = (err) => {
  if (!err || !err.details) return ``; // Return empty string if no error details

  let errors = ``; // Initialize an empty string for errors
  let details = err.details; // Get error details
  // Append each error detail message to the errors string
  details.forEach((detail) => (errors += `${detail.message}\n`));
  return errors; // Return the formatted error messages
};
