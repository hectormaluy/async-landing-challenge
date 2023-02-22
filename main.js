const content = document.querySelector('#videos');

const urlApi = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCOVfq3NNYjlYCz1iou69FwQ&part=snippet%2Cid&order=date&maxResults=9';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a79b1f8b1emshfb74a8c41132709p16dc8ejsn49c80e62f0f0',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(url) {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
}

(async function () {
  try {
    const videos = await fetchData(urlApi);
    let view = `
    ${videos.items.map(video => `
      <figure>
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}">
        <h3> ${video.snippet.title}</h3>
      </figure>
    `).slice(0,4).join('')}`;
    content.innerHTML = view;
  } catch(error) {
    console.log(error);
    content.innerHTML = `<p style='color:red;'>Error en youtube API: ${error}</p>`;
  }
})();
