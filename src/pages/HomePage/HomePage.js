import React from 'react';

import Banner from '../../components/Banner/Banner';
import Navigation from '../../components/Navigation/Navigation';
import Row from '../../components/Row/Row';
import requests from '../../Requests';

import './HomePage.css';

function HomePage() {
    //navigation
    //banner
    //row pf collection
  return (
    <div className='homepage'>
     <Navigation />
    <Banner />     

    <Row title='NETFLIX ORIGINALS' fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
    <Row title='TOP RATED' fetchUrl={requests.fetchTopRated} isLargeRow={false} />
    <Row title='TRENDING NOW' fetchUrl={requests.fetchTrending} isLargeRow={false} />
    <Row title='ROMANCE' fetchUrl={requests.fetchRomanceMovies} isLargeRow={false} />
    <Row title='COMEDY' fetchUrl={requests.fetchComedyMovies} isLargeRow={false} />
    <Row title='HORROR' fetchUrl={requests.fetchHorrorMovies} isLargeRow={false} />
    <Row title='ACTION' fetchUrl={requests.fetchActionMovies} isLargeRow={false} />
    <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} isLargeRow={false} />


    </div>
  )
}

export default HomePage