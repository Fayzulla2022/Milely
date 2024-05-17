// Function to extract query parameters from a URL
const getUrlVars = (url) => {
  var vars = {};
  url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
};

export default class Utils {
  // Function to get a specific query parameter from a URL
  static getUrlParam = (url, parameter, defaultvalue) => {
    let urlparameter = defaultvalue;
    if (url.indexOf(parameter) > -1) {
      urlparameter = getUrlVars(url)[parameter]; // Extracting the parameter value from the URL
    }
    return urlparameter;
  };

  // Function to generate a random string
  static getRandomString = () => Math.random().toString(36).substr(2, 10);
}
