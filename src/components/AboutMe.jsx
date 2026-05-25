import {baseUrl, periodMonth} from "../utils/constants.js";
import {useEffect, useState} from "react";
import {fieldsHero} from "../utils/constants.js";

const AboutMe = () => {
    const [hero, setHero] = useState(() => {
        const hero = JSON.parse(localStorage.getItem('hero'));
        if (hero && Date.now() - hero.timestamp < periodMonth) {
            return hero.payload;
        }
    });

    useEffect(() => {
        if (!hero) {
            fetch(`${baseUrl}/v1/peoples/1`)
                .then(response => response.json())
                .then(data => {
                    const {name, gender, birth_year, height, mass, hair_color, skin_color, eye_color} = data;
                    const info = {name, gender, birth_year, height, mass, hair_color, skin_color, eye_color};

                    setHero(info);
                    localStorage.setItem('hero', JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }));
                })
        }
    }, [])


    return (
        <>
            {(!!hero) &&
                <div className="text-2xl leading-loose text-justify ml-5">
                    {fieldsHero.map(({ key, label }) => (
                        <p key={key}>
                            {label}: {hero[key]}
                    </p>
                    ))}
                </div>
            }
        </>
    );

}

export default AboutMe;