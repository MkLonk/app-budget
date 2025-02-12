const config = {
  API_BASE_URL: 'http://localhost:3001', // Адрес сервера
  AUTH_TOKEN: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzllZmJjNTAwNGZiODZlZmNjYTIwZjEiLCJpYXQiOjE3MzkwODAwNDMsImV4cCI6MTczOTY4NDg0M30.gveAa06e-y4513otFNBH3wI2z-cSeRxleI25YZSebuY', // Токен авторизации
};

export const toastSuccess = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export const toastError = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

export default config;