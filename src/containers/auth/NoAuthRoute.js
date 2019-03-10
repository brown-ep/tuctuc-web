import React from 'react'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const NoAuthRoute = ({
  component: Component,
  authenticated,
  redirect = '/',
  props: CProps,
  ...rest
} = {}) => (
  <Route
    {...rest}
    render={props =>
      !authenticated ? (
        <Component {...props} {...CProps} />
      ) : (
        <Redirect to={{ pathname: redirect }} />
      )
    }
  />
)

export default connect(state => ({ authenticated: state.auth.authenticated }))(
  NoAuthRoute
)
