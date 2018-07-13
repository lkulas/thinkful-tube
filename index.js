const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

const YOUTUBE_API_KEY = 'AIzaSyAQKivGnOcPzzD1SKj7OY3bKKXJHzrDvlU';

function getDataFromApi(searchTerm, callback) {
  const query = {
    part: 'snippet',
    key: YOUTUBE_API_KEY,
    q: searchTerm,
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function displayData(data) {
  const results = data.items.map(function(item, index) {
    return generateResult(item);
  });
  $('.js-search-number').html(`<h2>Results:</h2>
    <p>Showing ${data.pageInfo.resultsPerPage} of ${data.pageInfo.totalResults} total</p>`);
  $('.js-search-number').prop('hidden', false);
  $('.js-search-results').html(results);
  $('.js-search-results').prop('hidden', false);
}

function generateResult(result) {
  return `
  <div>
    <a href="https://www.youtube.com/watch?v=${result.id.videoId}">
      <img src="${result.snippet.thumbnails.medium.url}" alt="Thumbnail image for video ${result.snippet.title}">
    </a>
    <p>
      <a href="https://www.youtube.com/watch?v=${result.id.videoId}">${result.snippet.title}</a> 
      by <a href="https://www.youtube.com/channel/${result.snippet.channelId}">${result.snippet.channelTitle}</a>
    </p>
  </div>`;
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val("");
    getDataFromApi(query, displayData);
  });
}

$(watchSubmit);