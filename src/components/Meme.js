import React, { useEffect, useState } from 'react';

// => Made an API call 
// inside UseEffect(() => fetch("https://api.imgflip.com/get_memes"))
// instead of importing it 

// data used/fetched from "https://api.imgflip.com/get_memes"


const Meme = () => {
    // states
    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })
    const [allMemes, setAllMemes] = useState([])

    // useEffect 
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, []);
 
    // functions
    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        // console.log(meme.randomImage); // test
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
        // console.log(value); // test
    }

    return (
        <main>
            <div className="form">
                <input className="form--input"
                    type="text"
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input className="form--input"
                    type="text"
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button
                    className="form--button"
                    onClick={getMemeImage}
                >Get a new meme image</button>
            </div>
            <img className="meme--image"
                src={meme.randomImage}
            />
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
        </main>
    )
}

export default Meme;


