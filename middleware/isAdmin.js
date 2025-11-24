export default function ({ $auth, redirect }) {
  // Not logged in → force redirect
  if (!$auth.loggedIn) {
    return redirect('/admin/login')
  }

  const role = $auth.strategy?.name

  // Logged in but not admin → block access
  if (role !== 'admin') {
    return redirect('/admin/login')
  }

  // Everything OK → allow access
  return
}
