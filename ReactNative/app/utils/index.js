// convert image data from array format to string format
export const arrayBufferToBase64 = buffer => {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach(b => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

export const filterArtworks = (ids, allArtworks) => {
  let results = [];
  for (let i = 0; i < ids.length; i++) {
    let currId = ids[i];
    let arr2 = allArtworks.filter(element => element._id === currId);
    results = results.concat(arr2);
  }
  return results;
};
