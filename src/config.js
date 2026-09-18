export const API_URL =
  window.location.hostname === "localhost"
    ? "https://omiero004-8181.theadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/"
    : "https://omiero004-8181.theadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/";

console.log("API_URL :", API_URL);