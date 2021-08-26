let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const authHeader = () => {
  return { headers: { Authorization: token } };
};
