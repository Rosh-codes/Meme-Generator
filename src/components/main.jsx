import {useState , useEffect} from "react"
export default function Main() {
const [meme,setMeme] = useState({
    img : "http://i.imgflip.com/1bij.jpg",
    top : "HotWheels!",
    bottom:"Take My Money!!!"
})
function Update(event){
   const {value,name}=event.currentTarget
   setMeme(prevMeme=> ({...prevMeme , [name] : value}))
}
const[memeApi,SetMemeApi] = useState([])
useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
    .then(result=>result.json())
    .then(data=>SetMemeApi(data.data.memes))
    
},[])
function updateImg(){
    const randomNum = Math.floor(Math.random()*memeApi.length)
    const randomImg = memeApi[randomNum].url
    setMeme(prevMeme=>({...prevMeme , img : randomImg}))
}
    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder={meme.top}
                        name="top"
                        onChange={Update}
                    />
                </label>
                <label>Bottom Text
                    <input
                        type="text"
                        placeholder={meme.bottom}
                        name="bottom"
                        onChange={Update}
                    />
                </label>
                <button onClick={updateImg}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src= {meme.img}/>
                <span className="top">{meme.top}</span>
                <span className="bottom">{meme.bottom}</span>
            </div>
        </main>
    )
}