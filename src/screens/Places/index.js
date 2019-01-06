import React, { Component } from 'react';
import axios from 'axios';
import { GooglePlacesKey } from '../../common/apiKey';

class Places extends Component {
    constructor(props) {
        super(props);
        if(this.props.match.params.data) {
            let data = JSON.parse(this.props.match.params.data);
            this.state = {
                ...data,
                nearbyLocations: []
            }
        } else {
            this.state = {
                address: null,
                placeId: null,
                lat: null,
                long: null,
                nearbyLocations: []
            }
        }
        console.log(this.state);
    }
    componentDidMount() {
        const self = this;
        const config = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
        };
        const {lat, long } = this.state;
        if(this.state.placeId === null) {
            window.location.href = '/';
        } else {
            const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=5000&types=restaurant&key=${GooglePlacesKey}`;
            console.log(URL);
            axios.get(URL, config)
                .then(resp => {
                    this.setState({nearbyLocations: resp.results});
                    console.log(resp);
            }).catch((err) => {
                console.log(err);
                const mockData = [
                    {
                        "geometry" : {
                            "location" : {
                                "lat" : 28.64574959999999,
                                "lng" : 77.21592199999999
                            },
                            "viewport" : {
                                "northeast" : {
                                    "lat" : 28.6471203802915,
                                    "lng" : 77.2176915302915
                                },
                                "southwest" : {
                                    "lat" : 28.6444224197085,
                                    "lng" : 77.2149935697085
                                }
                            }
                        },
                        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/lodging-71.png",
                        "id" : "a5af666c0cf4ef4d08fdb3d3cb8984721cee5f79",
                        "name" : "Hotel Ajanta",
                        "opening_hours" : {
                            "open_now" : true,
                            "weekday_text" : []
                        },
                        "photos" : [
                            {
                                "height" : 667,
                                "html_attributions" : [
                                    "\u003ca href=\"https://maps.google.com/maps/contrib/100923470934337257696/photos\"\u003eHotel Ajanta\u003c/a\u003e"
                                ],
                                "photo_reference" : "CmRaAAAAYgvLf0Uyl5CSWbjAj3r_18vXsC1IBk8LpA5TTuqDC1tfrgouqsawXSdQqmUQc4jZwWwpuyOWYUqEg0aT7ifa3LJUxfpRGzgynY4DDNSokxBN4vo6u4I3T_wPy956JLOdEhCr9AKooCt04kshi8LKFU7pGhSZcEY_yqv5ci64tFnCUoOL6WQuVQ",
                                "width" : 1000
                            }
                        ],
                        "place_id" : "ChIJbSgeG0D9DDkRyFl3u9GTidE",
                        "rating" : 3.7,
                        "reference" : "CmRSAAAAk4q0Mr2f1MG2qotjDklj6Ho62krvtdDD6uDTLjigOlZzSMkAtjFd4l3hk5VWM17Zl2fnJAkiEqOt_kE2qO4b4rfil3aU6pi2awObthjb9p7ut97BLuwrhu5O46OJRdGYEhCEuShYwRVHtLl4wiCf97O0GhSQpytCPuS7OwghJkVCa4kRwuaCag",
                        "scope" : "GOOGLE",
                        "types" : [ "lodging", "restaurant", "food", "point_of_interest", "establishment" ],
                        "vicinity" : "36, Arakashan Road, Ram Nagar, Diagonally Opposite To Church, New Delhi"
                    },
                    {
                        "geometry" : {
                            "location" : {
                                "lat" : 28.645376,
                                "lng" : 77.21722199999999
                            },
                            "viewport" : {
                                "northeast" : {
                                    "lat" : 28.6467249802915,
                                    "lng" : 77.21857098029149
                                },
                                "southwest" : {
                                    "lat" : 28.6440270197085,
                                    "lng" : 77.21587301970848
                                }
                            }
                        },
                        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                        "id" : "f9ccd5330b3cd7c6e3c9189ad66aa91551124fdf",
                        "name" : "Hotel Delhi City Centre",
                        "opening_hours" : {
                            "open_now" : true,
                            "weekday_text" : []
                        },
                        "photos" : [
                            {
                                "height" : 643,
                                "html_attributions" : [
                                    "\u003ca href=\"https://maps.google.com/maps/contrib/109415078000260562427/photos\"\u003eHotel Delhi City Centre\u003c/a\u003e"
                                ],
                                "photo_reference" : "CmRaAAAA7Ne0zzBSWT8v_Tka1b8HUATExWWa1qHYU_UKTMwDqqx7k-AMU-K3YKBtZyyQyqBu8QsqPU4etOGJHvyjldOsXTJnh5ezKIVeRzjVLFoIap37W-YrsCCBX1-lzWzdmK2SEhBRiCE3yRVFCLSw0RYscNRPGhSYth-vHi9IuEhbn0Y-EQJ_dVUdbg",
                                "width" : 1400
                            }
                        ],
                        "place_id" : "ChIJSwy5B8T7DDkRww8bEbrb-Wo",
                        "rating" : 3.4,
                        "reference" : "CmRRAAAAhFFoTLdDPEE4sbyDKSUC1Uk9AvE820D7Mb0jiDsuPVFh-BmE43GOfU6nw2FTrIENVU2pMk7vJ1gv97UCA3fLVgmbuQ2UsajqFCBs14LrwUUr_-3ja-c2_EA0bZt3c3AjEhDhsKzzhzGzqNaBK1hfWhSHGhQN15uezZ_TAhaUcDpBAUAxgFangA",
                        "scope" : "GOOGLE",
                        "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
                        "vicinity" : "8633-45, Behind Ajanta Hotel, Arakashan Road, Ram Nagar, New Delhi"
                    },
                    {
                        "geometry" : {
                            "location" : {
                                "lat" : 28.7050938,
                                "lng" : 77.19018009999999
                            },
                            "viewport" : {
                                "northeast" : {
                                    "lat" : 28.7064823802915,
                                    "lng" : 77.1914876302915
                                },
                                "southwest" : {
                                    "lat" : 28.7037844197085,
                                    "lng" : 77.18878966970848
                                }
                            }
                        },
                        "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                        "id" : "ce5e8805b168999c1669e7f2015877972fc044e2",
                        "name" : "Grand Plaza",
                        "opening_hours" : {
                            "open_now" : true,
                            "weekday_text" : []
                        },
                        "photos" : [
                            {
                                "height" : 3024,
                                "html_attributions" : [
                                    "\u003ca href=\"https://maps.google.com/maps/contrib/110117796641376580021/photos\"\u003eNiteesh Mehra\u003c/a\u003e"
                                ],
                                "photo_reference" : "CmRaAAAAN91IkPKgyNk4At4763NVeuLQbrLjG4IJSvQx9qD3gskDz_cMfthJjEpWYOMNyNsx19a7yuAK3aikLMx19ArIs-sW4c0zQPV52EMvHci1Yk9UoyXur5Vtw71sh8w3y9AyEhBeCAF430u9crG3JSlih92hGhTR7vlW_Mtg1-P7A6ESOSW3kc6yCA",
                                "width" : 4032
                            }
                        ],
                        "place_id" : "ChIJlfW6lAYCDTkR0VvGIJFTOpM",
                        "rating" : 4,
                        "reference" : "CmRSAAAAXzB6aUJFHXGr3SAmOhsAp-9MgNS5h6jOn_UNilipD5gEMH_mPvuHJy5osTbxc7HcWiboTo1NaI_9VQWzxBTYCmYrF6sQgfeFWoTosTyaS1HEFVa5C63E942-BvMGxpxWEhDiew0Rz-b5tSOOk-728UvZGhQXAY42Rs5WJHgHRNrd60rn1uZjVA",
                        "scope" : "GOOGLE",
                        "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
                        "vicinity" : "B 1 Model Town, Part II, Delhi"
                    }];
                this.setState({nearbyLocations: mockData})
            });
        }
    }
    render() {
        const { lat, long, address, placeId, nearbyLocations} = this.state;
        return(
            <React.Fragment>
                <h1>NearBy Places Zone {address}</h1>
                {
                    nearbyLocations.map(ind => (
                        <div>
                            <h3>PlaceName: {ind.name}</h3>
                            <h3>Rating : {ind.rating}</h3>
                            <br/>
                        </div>
                    ))
                }
            </React.Fragment>
        )
    }
}
export default Places;