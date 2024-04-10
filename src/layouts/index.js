import Centered from './centered'
import Empty from './empty'
import Main from './main'

const Layouts = ({children}) => {
  if (['/404', '/500'].includes(pathname)) {
    return <Centered>{children}</Centered>
  }
  if (
    [
      '/login-1',
      '/contact-us-1',
      '/create-account',
      '/email-confirmation',
      '/logout',
      '/reset-password',
      '/forgot-password',
      '/lock-screen',
      '/subscribe',
      '/error-page',
      '/coming-soon'
    ].includes(pathname)
  ) {
    return <Centered>{children}</Centered>
  } else if (
    ['/landing', '/login-1', '/login-2', '/login-3', '/auth/login'].includes(pathname)
  ) {
    return <Empty>{children}</Empty>
  } else {
    return <Main>{children}</Main>
  }
}

export default Layouts
