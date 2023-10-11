const RedirectToStrava = () => {
  const redirectUri = new URL(window.location.href);
  redirectUri.pathname = '/oauth/callback/strava';
  redirectUri.search = '';

  const scopes = ['read', 'activity:write'];

  let state;

  if (window.parent) {
    state = window.location.ancestorOrigins[0] + '/piste';
  } else {
    state = window.location.href;
  }

  const qs = new URLSearchParams({
    client_id: process.env.REACT_APP_STRAVA_CLIENT_ID ?? '',
    redirect_uri: redirectUri.toString(),
    response_type: 'code',
    scope: scopes.join(','),
    state,
  });

  const url = `https://www.strava.com/oauth/authorize?${qs.toString()}`;

  if (window.parent) {
    window.parent.location.href = url;
  } else {
    window.location.href = url;
  }

  return <></>;
};

export default RedirectToStrava;
