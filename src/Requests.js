const API_KEY = 'c79efceed6a0d0b305d6ae28c07e317a';

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    //the instruction before is like call this url https://api.themoviedb.org/3/trending/all/week?api_key=abc..&language=en-US using axios concept to make requests 
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with-networks=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with-genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with-genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with-genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with-genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with-genres=99`,
};
export default requests;