// TODO: create page

const token = new URLSearchParams(window.location.search).get('token');
if (!token) {
  // Handle the error
}
const { data, error } = await authClient.resetPassword({
  newPassword: 'password1234',
  token,
});
