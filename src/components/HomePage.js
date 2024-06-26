import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div className="container text-center">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');

                .welcome-text {
                    font-family: 'Raleway', sans-serif;
                    font-size: 2em;
                    background-image: -webkit-linear-gradient(left, #ff4b2b, #ff416c);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }

                .page-text {
                    font-family: 'Raleway', sans-serif;
                    font-size: 1.2em;
                    line-height: 1.6;
                }
                
                `}
            </style>

            <h1 className='page-text'>Welcome to the Photography Contest Platform</h1>
            <p className="lead">
                <span className="welcome-text">
                    Welcome,
                </span> 
                <span className="welcome-text">
                    {sessionStorage.getItem("username") ? sessionStorage.getItem("username")+"!" : 'Photographer!'}
                </span>
            </p>
            <p className="lead page-text">
                Join our contests, upload your best photos, and vote for your favorites!
            </p>

            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/id/1015/800/400"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Explore the Beauty of Nature</h3>
                        <p>Capture stunning landscapes and wildlife.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/id/1027/800/400"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Celebrate Portraits</h3>
                        <p>Discover the art of capturing emotions and personalities.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://picsum.photos/id/1031/800/400"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Travel and Adventure</h3>
                        <p>Share your journeys through captivating travel photography.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default HomePage;
