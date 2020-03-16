import React, {useState} from 'react';
import Header from './../../Layout/Header/Header.js';
import Landing from './../../Layout/Landing/Landing.js';
import Main from './../../Layout/Main/Main.js'
import Confirmation from './../../UI/Confirmation/Confirmation';
import Checkout from './../../UI/Checkout/Checkout';
import Scanner from './../../UI/Scanner/Scanner';
import Form from './../../UI/Form/Form';


const HomePage = (props) => {
    const [onScannerMode, setOnScannerMode] = useState(false)

    const changeMode = () => {
        setOnScannerMode(currentMode => !currentMode);
    }

    return (
        <>
            <div id="body-wrapper" className="header-absolute" onClick={() => {
                if (onScannerMode) {
                    changeMode();
                }
            }}>
            {
                onScannerMode ? <Scanner changeMode={changeMode} /> : null
            }
                <Header />
                <div id="content">
                    <Landing changeMode={changeMode} />
                    <Main />
                    <Checkout history={props.history} />
                </div>
            </div>
            <Confirmation />
            <Form />
        </>
    )
};

export default HomePage;