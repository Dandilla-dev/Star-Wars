// import '../Contact.css';
import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && ((Date.now() - planets.time) < periodMonth)) {
            return planets.payload;
        } else {
            return ['wait...']
        }
    });

    useEffect(() => {
        const getPlanets = async () => {
            const res = await fetch(`${baseUrl}/v1/planets`);
            const data = await res.json();
            const planets = data.map(item => item.name);
            setPlanets(planets);
            localStorage.setItem('planets', JSON.stringify({
                payload: planets,
                time: Date.now()
            }));
        }

        if (planets.length === 1){
            getPlanets().then(() => console.log('Planets were loaded'));
        }
        return () => console.log('Contact component unmounted');
    }, [])

    return (
        <form onSubmit={e => {
            e.preventDefault();
        }}>
            <div className="p-5 border rounded-sm bg-[#f2f2f2]"  >
            <label>
                <div className="my-label">First Name
                <input className="my-input"
                       type="text" name="firstname" placeholder="Your name.."/>
                </div>
                </label>
            <label>
                <div className="my-label">Last Name
                <input className="my-input" type="text" name="lastname" placeholder="Your last name.."/>
                </div>
            </label>
            <label>
                <div className="my-label">Planet
                <select className="my-input" name="planet">
                    {planets.map(item => <option value={item} key={item}>{item}</option>)}
                </select>
                </div>
            </label>

            <label className="my-label">Subject
                <div>
                <textarea className="my-input" name="subject" placeholder="Write something.."></textarea>
                </div>
            </label>
            <button className="bg-sub-cover text-sub-char  border-none rounded-sm cursor-pointer text-center
             hover:bg-[#45a049]"
                    type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Contact;