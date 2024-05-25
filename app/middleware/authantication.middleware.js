import { validateToken } from "../services/authatication.js";

function checkForAuthanticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    } catch (error) {
      console.error("Token validation failed:", error.message);
    }
    return next();
  };
}

export { checkForAuthanticationCookie };
