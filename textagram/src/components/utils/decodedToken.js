import jwt_decode from "jwt-decode";

function decodedToken() {
  var token = localStorage.getItem("token");
  if (token) {
    var decoded = jwt_decode(token);

    return decoded.subject;
  }
}

export default decodedToken;
