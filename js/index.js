window.onload = () => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    const main = document.querySelector('#main');
    const canvasDom = document.querySelector('#capture')
    const repeatingImages = document.querySelectorAll('#repeatSection > .img')
    const imgSections = document.querySelectorAll('.imgSection');
    const contentSections = document.querySelectorAll('.contentSection');
    let sectionSize;

    const getBackColor = (scrollY) => {
        const drawingCanvas = () => {
            html2canvas(body).then(canvas => {
                if(canvasDom.hasChildNodes()) canvasDom.removeChild(canvasDom.childNodes[0])
                canvasDom.appendChild(canvas);

                let url = document.querySelector('canvas').toDataURL();
                console.log(url)

            });
        }


        drawingCanvas();
        //scrollY를 이용해서 캔버스의 좌표를 지정 후, 색상 구하기
        //그런데 캡쳐자체가 내 예상과 다르게 됨
    }
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
        let oneSectionSize = sectionSize/4;

        switch (true) {
            case oneSectionSize>window.scrollY :
                imgSections[1].style.zIndex = '0';
                imgSections[0].style.display = 'block';
                imgSections[0].style.zIndex = '1';
                imgSections[1].style.display = 'none';
                main.style.display = "flex";
                break;
            case oneSectionSize<window.scrollY&&window.scrollY<oneSectionSize*2 :
                imgSections[0].style.zIndex = '0';
                imgSections[2].style.zIndex = '0';
                imgSections[1].style.display = 'block';
                imgSections[1].style.zIndex = '1';
                imgSections[0].style.display = 'none';
                imgSections[2].style.display = 'none';
                main.style.display = "none";
                break;
            case oneSectionSize*2<window.scrollY&&window.scrollY<oneSectionSize*3 :
                giveFixed();
                imgSections[1].style.zIndex = '0';
                imgSections[3].style.zIndex = '0';
                imgSections[2].style.display = 'block';
                imgSections[2].style.zIndex = '1';
                imgSections[1].style.display = 'none';
                imgSections[3].style.display = 'none';
                break;
            case oneSectionSize*3<window.scrollY&&window.scrollY<oneSectionSize*4 :
                imgSections[2].style.zIndex = '0';
                imgSections[3].style.display = 'block';
                imgSections[3].style.zIndex = '1';
                imgSections[3].style.position = 'fixed'
                imgSections[2].style.display = 'none';
                removeFixed();
                break;
        }
    });

    window.addEventListener('resize', () => {
        sectionSize = getSectionSize();
    })

    repeatImg();
}