'use client';
import './Meme.css';
import { useState, useEffect } from "react";
import Image from "next/image";

function Meme() {
    const [ meme, setMeme ] = useState({
        topText: "",
        bottomText: "",
        randomImage: "/images/memeimg.png"
    });
    const [ allMemes, setAllMemes ] = useState([]);

    // NOTE => using an async function inside a useEffect
    /**
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */
    useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes");
            const data = await res.json();
            setAllMemes(data.data.memes);
        }
        getMemes();
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[ randomNumber ].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }));

    }

    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [ name ]: value
        }));
    }

    return (
        <>
            {/* form */}
            <div className="form-section">
                {/* inputs container */}
                <div className="input-pos">
                    <div className="inputs-container">
                        <input
                            onChange={handleChange}
                            name="toptext"
                            value={meme.toptext}
                            type="text"
                            placeholder="Top text"
                        />
                        <input
                            onChange={handleChange}
                            name="bottomtext"
                            value={meme.bottomtext}
                            type="text"
                            placeholder="Bottom text"
                        />
                    </div>
                </div>
                <div className="button">
                    <button onClick={getMemeImage}>
                        <p>Get a new meme image 🏞️ </p>
                    </button>
                </div>
            </div>

            {/* image */}
            <div className="meme-image-container">
                
                <p className="top-text">{meme.toptext}</p>
                    <Image
                        src={meme.randomImage}
                        className="meme-img"
                        alt="Meme image generated"
                        width={385}
                        height={400}
                        // layout='fill'
                    />
                <p className="bottom-text">{meme.bottomtext}</p>
                
            </div>
            {/* <pre>{JSON.stringify(allMemes, null, 2)}</pre> */}
        </>
    );
}
export default Meme;