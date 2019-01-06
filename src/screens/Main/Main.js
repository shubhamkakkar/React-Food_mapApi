import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { AddressSelector } from '../../components';
import { mainImage } from '../../assets';
import { rootURLGeoCodes} from "../../common/api";
import './Main.css';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            long: null,
            address: null,
            placeId: null
        };
        this.locationUpdater = this.locationUpdater.bind(this);
    }
    componentDidMount() {
        let lat, long, self = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                self.locationUpdater(lat, long);
            })
        }
    }
    locationUpdater = (lat, long) => {
        let self = this;
        axios.get(`${rootURLGeoCodes}${lat},${long}`).then(response => {
            let result = response.data.results;
            let address = null;
            let placeId = null;
            if(result.length > 0) {
                address = result[0].formatted_address;
                placeId = result[0].place_id;
            }
            self.setState({address, placeId, lat, long});
        })
    };
    inputHandler = (lat, long) => {
        this.locationUpdater(lat, long);
    };
    render() {
        const { lat, long, address } = this.state;
       return (
            <div className={'MainContainer'}>
                <div className={'WelcomeDiv'}>
                    <div className={['flex-1']}>
                        <h1 className={'title'}>Food Nearby</h1>
                        <h4 className={'sub-title'}>Your Portal to satiate your Hunger</h4>
                        <hr style={{marginRight:20}}/>
                        <AddressSelector inputHandler={this.inputHandler.bind(this)}/>
                        {
                            (lat && long) ? (
                                <React.Fragment>
                                    <h4 className={'sub-title'}>or <br/><br/> We Detected You're Location as <br/><br/> {address}</h4>
                                </React.Fragment>
                            ) : ''
                        }
                        <div style={{textAlign: 'center'}}>
                            <Link to={`/nearBy/${JSON.stringify(this.state)}`}>
                                <button className={'buttonMain'}>
                                    Feed Me, I'm Hungry !!
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className={['flex-1']}>
                        <img src={mainImage} className={'mainImage'} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
