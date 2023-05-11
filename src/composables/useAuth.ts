import { useRouter } from 'vue-router'
import { computed } from 'vue'

import axios from 'axios'

export const useAuth = () => {
  const urlSearchParams = new URLSearchParams(window.location.search)

  const client_id = 'GKPPkX3EVcEyD6APv1YrWAlJRwKUm9fVJ8zxFXsEKE0'
  const redirect_uri = encodeURIComponent(window.location.origin)

  const auth = async () => {
    const code = urlSearchParams.get('code')

    if (!code) {
      window.location.href = `https://unsplash.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=public+write_likes`

      return
    }

    const response = await axios.post('https://unsplash.com/oauth/token', {
      client_id,
      redirect_uri,
      code,
      client_secret: 'LIlXT1wU1QDaBHSMcJWTCALwnBttbmHNbOudHRbdZio',
      grant_type: 'authorization_code',
    })
  }

  return {
    auth,
  }
}
