
export default function handler(req, res) {

  const backendUrl = 'https://backend-snakr.vercel.app'

  const returnTo = `${backendUrl}/api/auth/steam/callback`

  const steamUrl =
    'https://steamcommunity.com/openid/login?' +
    new URLSearchParams({
      'openid.ns': 'http://specs.openid.net/auth/2.0',
      'openid.mode': 'checkid_setup',
      'openid.return_to': returnTo,
      'openid.realm': backendUrl,
      'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
      'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
    })

  res.writeHead(302, { Location: steamUrl })
  res.end()
}