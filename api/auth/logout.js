export default function handler(req, res) {
  res.setHeader('Set-Cookie', `
    session=;
    HttpOnly;
    Secure;
    SameSite=Lax;
    Path=/;
    Max-Age=0
  `)

  res.status(204).end()
}