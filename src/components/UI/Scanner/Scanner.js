import React from 'react';
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';
import { setClientGoal, setClientData, setClientSocket } from './../../../store/actions/client';
import { fetchCategories } from './../../../store/actions/categories';
import socketIOClient from 'socket.io-client';
import { baseURL } from './../../../config';


const Scanner = ({onSetClientGoal, onSetClientData, changeMode, onFetchCategories, onSetClientSocket}) => {

    const handleScan = data => {
        if(data !== null) {
            const restaurantId = data.split(' ')[0];
            const tableId = data.split(' ')[1];
            onSetClientData({
                restaurantId: restaurantId,
                tableId: tableId,
                QrCodeScanned: true,
            });
            onSetClientGoal('ON PLACE ORDER');
            onFetchCategories(restaurantId);
            changeMode();
            openSocket(tableId);
        }
    };

    const openSocket = (tableId) => {
        const socket = socketIOClient(`${baseURL}/`);
        socket.emit('newScan', tableId);
        onSetClientSocket(socket);
    }

    const handleError = error => {
        console.log(error);
    };

    return (
        <div style={{
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            position: 'fixed',
            zIndex: '100',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{
                    width: '100%',
                    position: 'fixed',
                    zIndex: '1000'
                }}
            />
        </div>
    )
};

const mapStateToProps = state => {
    return {
        goal: state.client.goal,
        data: state.client.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetClientGoal: (goal) => dispatch(setClientGoal(goal)),
        onSetClientData: (data) => dispatch(setClientData(data)),
        onSetClientSocket: (socket) => dispatch(setClientSocket(socket)),
        onFetchCategories: (restaurantId) => dispatch(fetchCategories(restaurantId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);