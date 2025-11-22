const backendDomain = window.location.origin;
const backendEndpoint = '/api/v1';
const backendURL = backendDomain + backendEndpoint;

export const config = {
  backendDomain,
  backendURL,
  backendEndpoint,
  socketEndpoint: backendEndpoint + '/socket.io'
};
