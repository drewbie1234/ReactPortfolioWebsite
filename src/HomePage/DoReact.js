import React, {  useState, useEffect  } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const DoReact = () => {

    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [colorSpin, setColorSpin] = useState(0);
    const [displayContinue, setDisplayContinue] = useState('none');
    const [displaySvg, setDisplaySvg] = useState('flex-item');
    const [startX, setStartX] = useState(0);
  
    const startDrag = (event) => {
      event.preventDefault();
      setIsDragging(true);
      setStartX(event.pageX || event.touches[0].pageX);
    };
  
    const rotate = (event) => {
      if (!isDragging) return;
  
      const currentX = event.pageX || event.touches[0].pageX;
      const deltaX = currentX - startX;
  
      setRotation((prevRotation) => prevRotation + deltaX * 0.7);
      setStartX(currentX);
    };

    useEffect( () => {
      setColorSpin(((rotation % 360 + 360) % 360)+192.9);
      if (rotation >= 360){
        setDisplayContinue('unset')
        setDisplaySvg('none')
        
      }

    }, [rotation])
  
    const stopDrag = () => {
      setIsDragging(false);
    };
  
    const centerX = 0; // Replace with the actual center x-coordinate of your SVG path
    const centerY = -2; // Replace with the actual center y-coordinate of your SVG path
    const progressPercentage = (rotation / 360) * 100; // Calculate percentage

    const progressBarStyle = {
      width: `${progressPercentage}%`,
      height: '20px',
      backgroundColor: `hsl(${colorSpin}, 95.1%, 68.2%)`,
      maxWidth: '100%',
      display: {displaySvg}
    };

    const progressContainerStyle = {
      display: {displaySvg}
    };


    return (
    <div>
    <div class="container2b">
                <div ><h2>How do we make things responsive and interactive?</h2></div>
                <div class="container6">
                <svg 
                    id="svg-logo2"  
                    viewBox="175.7 0 490.6 600"  
                    xmlns="http://www.w3.org/2000/svg"                     
                    onMouseDown={startDrag}
                    onTouchStart={startDrag}
                    onMouseMove={rotate}
                    onTouchMove={rotate}
                    onMouseUp={stopDrag}
                    onTouchEnd={stopDrag}
                    transform={`rotate(${rotation} ${centerX} ${centerY})`}>
                <g fill={`hsl(${colorSpin}, 95.1%, 68.2%)`}>
                <path  

                    r="50"
                    style={{ cursor: "grab" }}

                
                d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z"/>
                <circle cx="420.9" cy="296.5" r="45.7"/>
                </g>
                </svg>
                </div>
            <div>
                <h2 id='react-to-find-out'>Give it a spin</h2>
            </div>
    </div>
    <div className="container2c">
                <div className="container3"><h2>We use something called...</h2></div>
                <div class="container6">
                  <svg 
                    id="svg-logo3"
                    width="391" 
                    height="65" 
                    viewBox="0 0 391 112"
                    display={displayContinue} 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M80.109 109.994L50.502 65.2634C65.4654 63.9429 78.9484 53.1009 78.9484 33.2934C78.9484 13.1384 64.6453 0.239197 44.5806 0.239197H0.517609V109.91H14.1674V66.3337H36.0391L63.992 109.91L80.109 109.994ZM42.9474 54.4144H14.1744V12.4851H42.9474C55.9439 12.4851 64.819 21.0336 64.819 33.3698C64.819 45.7061 55.9369 54.4284 42.9474 54.4284V54.4144ZM130.92 111.96C143.917 111.96 154.599 107.686 162.494 99.798L156.573 91.736C150.318 98.1508 141.116 101.765 132.074 101.765C114.977 101.765 104.448 89.2687 103.461 74.3123H167.749V71.1848C167.749 47.3463 153.605 28.5952 129.593 28.5952C106.901 28.5952 90.4645 47.1795 90.4645 70.1979C90.4645 95.0303 107.402 111.898 130.914 111.898L130.92 111.96ZM155.593 65.2564H103.468C104.128 53.0939 112.503 38.7769 129.447 38.7769C147.538 38.7769 155.426 53.4136 155.593 65.2564ZM249.654 109.987V55.3944C249.654 36.1568 235.685 28.5882 218.908 28.5882C205.911 28.5882 195.722 32.8625 187.174 41.7446L192.928 50.2931C199.996 42.7315 207.732 39.2774 217.267 39.2774C228.777 39.2774 237.332 45.3586 237.332 56.0477V70.3508C230.917 62.9491 221.875 59.4949 211.019 59.4949C197.536 59.4949 183.219 67.8836 183.219 85.6408C183.219 102.905 197.522 111.954 211.019 111.954C221.708 111.954 230.757 108.173 237.332 100.938V109.973L249.654 109.987ZM215.46 103.078C203.951 103.078 195.889 95.8503 195.889 85.8145C195.889 75.6189 203.951 68.3839 215.46 68.3839C224.176 68.3839 232.557 71.6713 237.332 78.2529V93.2163C232.564 99.791 224.176 103.078 215.46 103.078ZM309.285 111.96C323.755 111.96 332.304 106.039 338.392 98.1508L330.17 90.5892C324.909 97.6573 318.167 100.945 310.015 100.945C293.078 100.945 282.563 87.7884 282.563 70.1979C282.563 52.6075 293.085 39.6179 310.015 39.6179C318.237 39.6179 324.978 42.7454 330.17 49.9734L338.392 42.4118C332.311 34.5166 323.755 28.6021 309.285 28.6021C285.607 28.6021 269.656 46.693 269.656 70.2049C269.656 93.8835 285.607 111.905 309.285 111.905V111.96ZM375.727 111.96C382.955 111.96 387.403 109.82 390.531 106.866L386.917 97.6574C385.27 99.4644 382.052 100.945 378.528 100.945C373.107 100.945 370.466 96.6704 370.466 90.749V41.418H386.59V30.569H370.466V8.86415H358.13V30.569H344.974V41.4249H358.13V93.39C358.13 105.233 364.051 111.974 375.727 111.974V111.96Z" fill={`hsl(${colorSpin}, 95.1%, 68.2%)`}/>
                  </svg>
                  <svg width="200" height="200" viewBox="0 0 214 381" fill="none"  xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scale(0.5)', display: `${displaySvg}`}}>
                    <path d="M74.9091 272.727V270.545C75.1515 247.394 77.5758 228.97 82.1818 215.273C86.7879 201.576 93.3333 190.485 101.818 182C110.303 173.515 120.485 165.697 132.364 158.545C139.515 154.182 145.939 149.03 151.636 143.091C157.333 137.03 161.818 130.061 165.091 122.182C168.485 114.303 170.182 105.576 170.182 96C170.182 84.1212 167.394 73.8182 161.818 65.0909C156.242 56.3636 148.788 49.6364 139.455 44.9091C130.121 40.1818 119.758 37.8182 108.364 37.8182C98.4243 37.8182 88.8485 39.8788 79.6364 44C70.4243 48.1212 62.7273 54.6061 56.5455 63.4546C50.3636 72.303 46.7879 83.8788 45.8182 98.1818H0C0.969697 77.5758 6.30303 59.9394 16 45.2727C25.8182 30.6061 38.7273 19.3939 54.7273 11.6364C70.8485 3.87878 88.7273 0 108.364 0C129.697 0 148.242 4.24242 164 12.7273C179.879 21.2121 192.121 32.8485 200.727 47.6364C209.455 62.4242 213.818 79.2727 213.818 98.1818C213.818 111.515 211.758 123.576 207.636 134.364C203.636 145.152 197.818 154.788 190.182 163.273C182.667 171.758 173.576 179.273 162.909 185.818C152.242 192.485 143.697 199.515 137.273 206.909C130.848 214.182 126.182 222.848 123.273 232.909C120.364 242.97 118.788 255.515 118.545 270.545V272.727H74.9091ZM98.1818 380.364C89.2121 380.364 81.5152 377.152 75.0909 370.727C68.6667 364.303 65.4545 356.606 65.4545 347.636C65.4545 338.667 68.6667 330.97 75.0909 324.545C81.5152 318.121 89.2121 314.909 98.1818 314.909C107.152 314.909 114.848 318.121 121.273 324.545C127.697 330.97 130.909 338.667 130.909 347.636C130.909 353.576 129.394 359.03 126.364 364C123.455 368.97 119.515 372.97 114.545 376C109.697 378.909 104.242 380.364 98.1818 380.364Z" fill={`hsl(${colorSpin}, 95.1%, 68.2%)`}/>
                  </svg>
                <div/>
                <div className="progress-container" style={{display: `${displaySvg}`}}>
                  <div className="progress-bar" style={progressBarStyle}></div>
                </div>
                </div>
            <div>
            <Link to="/portfolio" id="cta-button2" style={{display: `${displayContinue}`}}>See More</Link>

            </div>
    </div>
    </div>
    )
}
export default DoReact;