import jwt_decode from "jwt-decode";

function decodedToken() {
  var token = localStorage.getItem("token");
  if (token) {
    var decoded = jwt_decode(token);
    console.log(decoded);
    return decoded.subject;
  }
}

export default decodedToken;
