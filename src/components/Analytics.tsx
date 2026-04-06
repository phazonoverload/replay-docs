'use client'

import { useEffect } from 'react'
import LogRocket from 'logrocket'
import mixpanel from 'mixpanel-browser'

const LOGROCKET_APP_ID = 'woocwd/replay-marketing-site-docs'

export default function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      LogRocket.init(LOGROCKET_APP_ID)
    }
    mixpanel.init('ffaeda9ef8fb976a520ca3a65bba5014', {
      track_pageview: 'url-with-path',
    })

    mixpanel.track('Loaded docs.replay.io')
  }, [])

  return (
    <>
      <script
        async
        src="/stats/script.js"
        data-website-id="9dab9357-6fa2-48ab-966a-82c4e1bb67fe"
      ></script>
    </>
  )
}
