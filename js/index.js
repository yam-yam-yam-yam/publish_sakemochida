window.onload = () => {
    const main = document.querySelector('#main');
    // const canvasDom = document.querySelector('#capture')
    const repeatingImages = document.querySelectorAll('#repeatSection > .img')
    const imgSections = document.querySelectorAll('.imgSection');
    const contentSections = document.querySelectorAll('.contentSection');
    let sectionSize;

    //html2canvas로 구현하다 실패
    // const getBackColor = (scrollY) => {
    //     const drawingCanvas = () => {
    //         html2canvas(body).then(canvas => {
    //             if(canvasDom.hasChildNodes()) canvasDom.removeChild(canvasDom.childNodes[0])
    //             canvasDom.appendChild(canvas);

    //             let url = document.querySelector('canvas').toDataURL();
    //             console.log(url)

    //         });
    //     }


    //     drawingCanvas();
    //     //scrollY를 이용해서 캔버스의 좌표를 지정 후, 색상 구하기
    //     //그런데 캡쳐자체가 내 예상과 다르게 됨
    // }

    //dom-to-image로 구현중
    // const getBackColor = (scrollY) => {
    //     domtoimage.toPng(body)
    //         .then((dataUrl) => {
    //             let img = new Image();
    //             img.src = dataUrl;
    //             console.log(img)
    //         })
    //         .catch((error)=>{
    //             console.log(error)
    //         })
    // }

    const repeatImg = () => {
        let imgIndex=0;
        repeatingImages[0].style.display = 'block';

        setInterval(() => {
            repeatingImages[imgIndex].style.zIndex = '0';
            imgIndex++;
            if(repeatingImages.length === imgIndex) imgIndex=0;
            repeatingImages[imgIndex].style.zIndex = '1';
            repeatingImages[imgIndex].style.display = 'block';

            setTimeout(() => {
                repeatingImages[imgIndex ? imgIndex-1 : repeatingImages.length-1].style.display = 'none';
            }, 3000);
        }, 5000);
    }

    const removeFixed = () => {
        imgSections.forEach(section => {
            section.style.position = "relative";
            section.style.display = "block";
        });
        contentSections.forEach(section => {
            section.style.visibility = 'visible';
        });
        repeatingImages.forEach(image => {
            image.style.position = "initial";
        });
    }
    const giveFixed = () => {
        imgSections.forEach(section => {
            section.style.position = "fixed";
            section.style.display = "none";
        });
        contentSections.forEach(section => {
            section.style.visibility = 'hidden';
        });
        repeatingImages.forEach(image => {
            image.style.position = "fixed";
        });   
    } 
    const getSectionSize = () => {
        const imgSectionsArray = Array.from(imgSections)
        let currentPage;
        currentPage = imgSectionsArray.find((section) => {
            return section.offsetHeight
        })
        return currentPage.offsetHeight * 4;
    }
    sectionSize = getSectionSize();

    // window.addEventListener('scroll', _.throttle(() => {
    //     getBackColor(window.scrollY);
    // }, 1000));

    window.addEventListener('scroll', () => { 
        const oneSectionSize = sectionSize/(imgSections.length+1);
        const sizeQuarter = Array.from(imgSections).map((imgSection,i) => {
            return oneSectionSize * (i+1)
        });

        const smallSizeQuarter = sizeQuarter.filter((size)=>{
            return size<window.scrollY
        })

        if(!smallSizeQuarter.length) {
            main.style.display = "flex";
            imgSections[1].style.zIndex = '0';
            imgSections[0].style.display = 'block';
            imgSections[0].style.zIndex = '1';
            imgSections[1].style.display = 'none';
        } else {
            main.style.display = "none";
        }
        if(smallSizeQuarter.length === sizeQuarter.length) {
            removeFixed();
        } else if(smallSizeQuarter.length+1 === sizeQuarter.length) {    
            giveFixed();
            imgSections[smallSizeQuarter.length-1].style.zIndex = '0';
            imgSections[smallSizeQuarter.length].style.display = 'block';
            imgSections[smallSizeQuarter.length].style.zIndex = '1';
            imgSections[smallSizeQuarter.length-1].style.display = 'none';
        } else {
            imgSections[smallSizeQuarter.length-1].style.zIndex = '0';
            imgSections[smallSizeQuarter.length+1].style.zIndex = '0';
            imgSections[smallSizeQuarter.length].style.display = 'block';
            imgSections[smallSizeQuarter.length].style.zIndex = '1';
            imgSections[smallSizeQuarter.length-1].style.display = 'none';
            imgSections[smallSizeQuarter.length+1].style.display = 'none';
        }
    });

    window.addEventListener('resize', () => {
        sectionSize = getSectionSize();
    })

    repeatImg();
}