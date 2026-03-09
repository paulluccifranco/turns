const url = 'http://turnos-backend:8080';

const buildAuthHeader = (token) => {
  if (!token) return null;
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

const apiPost = (path, body, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const authHeader = buildAuthHeader(token);
  if (authHeader) {
    myHeaders.append("Authorization", authHeader);
  }

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${url}${path}`, requestOptions);
}

const apiGet = (path, token) => {
  var myHeaders = new Headers();
  const authHeader = buildAuthHeader(token);
  if (authHeader) {
    myHeaders.append("Authorization", authHeader);
  }

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  return fetch(`${url}${path}`, requestOptions)
    .then(res => {
      if (res.status === 403 || res.status === 401) {
        localStorage.clear();
        window.location.replace("/");
      }
      return res
    });
}

const apiPut = (path, body, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const authHeader = buildAuthHeader(token);
  if (authHeader) {
    myHeaders.append("Authorization", authHeader);
  }

  var raw = JSON.stringify(body);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${url}${path}`, requestOptions);
}

const apiDelete = (path, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const authHeader = buildAuthHeader(token);
  if (authHeader) {
    myHeaders.append("Authorization", authHeader);
  }

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${url}${path}`, requestOptions);
}

const apiPatch = (path, token) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const authHeader = buildAuthHeader(token);
  if (authHeader) {
    myHeaders.append("Authorization", authHeader);
  }

  var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${url}${path}`, requestOptions);
}

export {
  url,
  apiPost,
  apiGet,
  apiPut,
  apiDelete,
  apiPatch
}