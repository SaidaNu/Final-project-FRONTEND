export function parseJwt(token) {
    try {
      const base64Payload = token.split(".")[1];
      const payload = atob(base64Payload); // декодируем base64
      return JSON.parse(payload);
    } catch (e) {
      console.error("JWT parse error:", e);
      return null;
    }
  }