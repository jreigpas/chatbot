import React, { useEffect, useState } from 'react'
import classes from "./Carousel.module.css";

const Carousel = (props) => {
    const {children} = props;

    //console.log('VALORES', children);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)

    // Set the length to match current children from props
    useEffect(() => {
        setLength(children.length)
    }, [children])

    const next = () => {
        if (currentIndex < (length - 1)) {
            setCurrentIndex(prevState => prevState + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        }
    }

    return (
      <div className={classes.carouselContainer}>
        <div className={classes.carouselWrapper}>
          {/* You can alwas change the content of the button to other things */}
          {currentIndex > 0 && (
            <button onClick={prev} className={classes.leftArrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Previous card"
              >
                <path d="M16 17.65L14.261 19 8 12l6.261-7L16 6.35 10.946 12z"></path>
              </svg>
            </button>
          )}
          <div className={classes.carouselContentWrapper}>
            <div
              className={classes.carouselContent}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children}
            </div>
          </div>
          {/* You can alwas change the content of the button to other things */}
          {currentIndex < length - 1 && (
            <button onClick={next} className={classes.rightArrow}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Next card"
              >
                <path d="M8 17.65L9.739 19 16 12 9.739 5 8 6.35 13.054 12z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>
    );
}

export default Carousel
