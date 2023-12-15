import React, { useState} from 'react';
import './profile.css';

const Profile = ({ onSubmit }) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:3001/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fname, lname }),
        });

        const result = await response.json();
        onSubmit(result);
    };

    return (
        <div className="container">
            <div className="content">
                <div className="column_wrapper">
                    <div id="settings_menu_scroller" className="">
                    <div className="settings panel scroller">
                        <div>
                        <a className="profilesettings" href="/profile">
                            Muokkaa profiilia
                        </a>
                        </div>
                        <div>
                        <a className="profilesettings" href="/account">
                            Käyttäjätilin asetukset
                        </a>
                        </div>
                        <div>
                        <a className="profilesettings" href="/sharing">
                            Jakoasetukset
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                <section className="content">
                    <div className="column_content"></div>
                </section>
            </div>
            <div className="settings-container">
                <form className="user-settings" onSubmit={handleSubmit}>
                    <span>
                        <label>
                            First name:
                            <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
                        </label>
                    </span>
                    <span>
                        <label>
                            Last name:
                            <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
                        </label>
                    </span>
                    <button type="submit">Tallenna</button>
                </form>
            </div>
        </div>
    )
}
export default Profile;