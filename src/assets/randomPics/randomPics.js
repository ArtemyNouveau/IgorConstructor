import randomPic1 from './randomPic1.jpg'
import randomPic2 from './randomPic2.jpg'
import randomPic3 from './randomPic3.jpg'
import randomPic4 from './randomPic4.jpg'
import randomPic5 from './randomPic5.jpg'
import randomPic6 from './randomPic6.jpg'
import randomPic7 from './randomPic7.jpg'

const randomPic = () => {
    const picArray = [
        randomPic1,
        randomPic2,
        randomPic3,
        randomPic4,
        randomPic5,
        randomPic6,
        randomPic7
    ]
    const rand = Math.floor(Math.random() * (picArray.length));

    return picArray[rand]
}

export default randomPic
