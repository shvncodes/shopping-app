import PropTypes from 'prop-types'

// This component will wrap the whole app with
// different React Context providers (Auth, Cart, etc).
// For now it is a simple passthrough so the routing
// layout can work, and we will plug real providers
// into it in a later step.
export function AppProviders({ children }) {
  return children
}

AppProviders.propTypes = {
  children: PropTypes.node,
}

export default AppProviders

