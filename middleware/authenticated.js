export default function ({ $auth, redirect }) {
  // If user not logged in, stop here
  if (!$auth.loggedIn) return

  const role = $auth.strategy?.name

  switch (role) {
    case 'admin':
      return redirect('/admin/dashboard')

    case 'customer':
      return redirect('/customer/dashboard')

    default:
      // fallback jika role tidak dikenali
      return redirect('/login')
  }
}
