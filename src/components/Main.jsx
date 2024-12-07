import {useState, useEffect} from 'react';

function Main() {
    const [meme, setMeme] = useState({
        topText:"one does not simplify",
        bottomText:"walk into mordor",
        imgUrl:"https://i.pinimg.com/736x/40/76/79/407679d20088c659aba7a760c69dd7c3.jpg"

    })


    const[allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])


    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
         const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imgUrl: newMemeUrl
        }))
    }


    function updateChange(event){
        const{value,name} = event.currentTarget
        console.log(value)
        setMeme(prevShown => ({
            ...prevShown,
            [name]:value
        }))
    }
  return (
    <>
    < section className='sec-tion'>
    <div>
      <h2>Top text</h2>
      <input type='text' 
      onChange={updateChange} 
      className='in-put' 
      name='topText'
      placeholder="one does not simply"
      value = {meme.topText}
      />
      
    </div>
    <div>
        <h2>Bottom text</h2>
        <input type='text'
         className='in-put' 
        placeholder="walk into mordor"
        name='bottomText'
        value = {meme.bottomText}
        onChange={updateChange}
        />
    </div>    
    </section>
    <section className='butt-on'><button onClick={getMemeImage}><h3>Get a new meme image</h3></button></section>
    <div className='img-resize'>
    
    </div>
    <div className="meme">
        <img src={meme.imgUrl} />
        <span className="top">{meme.topText}</span>
        <span className="bottom">{meme.bottomText}</span>
    </div>
    </>
    
    
  );
}

export default Main;
