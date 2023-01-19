import Cookies from "js-cookie";

const { VITE_BACKEND_URL } = import.meta.env;

const UploadImageEditor = (blobInfo, progress) => {
  const token = Cookies.get("userToken");
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("POST", `${VITE_BACKEND_URL}/upload/image`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.upload.onprogress = (e) => {
      progress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      if (xhr.status === 403) {
        reject(new Error());
        return;
      }
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`HTTP Error: ${xhr.status}`));
        return;
      }
      const json = JSON.parse(xhr.responseText);
      if (!json || typeof json.location !== "string") {
        reject(new Error(`Invalid JSON: ${xhr.responseText}`));
        return;
      }
      resolve(json.location);
    };
    xhr.onerror = () => {
      reject(
        new Error(
          `Image upload failed due to a XHR Transport error. Code: ${xhr.status}`
        )
      );
    };

    const formData = new FormData();
    formData.append("image", blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  });
};

export default UploadImageEditor;
