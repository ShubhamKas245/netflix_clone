
const createImageUrl = (path: string) => {
    return `${import.meta.env.VITE_IMAGE_URL}/${path}`;
  };

  export default createImageUrl;