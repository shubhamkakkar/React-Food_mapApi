import React, { Component } from 'react';
import PlacesAutocomplete,{ geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import './AddressSelector.css'

class AddressSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        };
    }
    handleChange = (address) => {
        this.setState({address})
    };
    handleSelect = (address) => {
        const { inputHandler } = this.props;
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(({lat, lng}) => console.log('Success', inputHandler(lat, lng)))
            .catch(error => console.error('Error', error))
    };
    render() {
        return(
            <PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect} >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                    <div >
                        <h3 className={'sub-title'}> Please Select Your Location</h3>
                        <input
                            {...getInputProps({
                                placeholder: 'eg: California',
                                className: 'inputField'
                            })}
                        />
                        <div style={{marginLeft: '13%', marginTop:3}}>
                            {suggestions.map(suggestion => {
                                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                                        <span>{suggestion.description}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        )
    }
}
export default AddressSelector;