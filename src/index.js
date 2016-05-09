import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// Playing around
import Airtable from 'airtable';
import jQuery from 'jquery';

import ImageList from './components/image_list';


class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			recs: []
		};

		//

		var base = new Airtable({ apiKey: 'keyCjfI4ZtJtgGcX3' }).base('app1a19fLEU8wI8S0');


		base('Imported Table').find('recz0YVfl9fU9gbtS', function(err, record) {
		    if (err) { console.log(err); return; }
		    console.log(record);
		});

		base('Imported Table').select({
		    // Selecting the first 3 records in Main View:
		    maxRecords: 300,
		    view: "Main View"
		}).eachPage((records, fetchNextPage) => {
		    // This function (`page`) will get called for each page of records.

		    records.forEach((record) => {
		        console.log('Retrieved ', record.get('Field 1'));
		        console.log('Record ', record._rawJson);

		        this.setState({
		        	recs: [...this.state.recs, record._rawJson]
		        });

		        console.log(this.state.recs);
		    });

		    // To fetch the next page of records, call `fetchNextPage`.
		    // If there are more records, `page` will get called again.
		    // If there are no more records, `done` will get called.
		    fetchNextPage();

		}, (error) => {
		    if (error) {
		        console.log(error);
		    }
		});

	}


	render() {
		return (
			<div>
				<ImageList 
					onImageClick = {(clickedRec) => 
						{

							console.log('Clicked ', clickedRec.id)

							var base = new Airtable({ apiKey: 'keyCjfI4ZtJtgGcX3' }).base('app1a19fLEU8wI8S0');

							base('Imported Table').update(clickedRec.id, {
							  "prop": "1"
							}, function(err, record) {
							    if (err) { console.log(err); return; }
							    console.log(record);
							});
						}
					}
					images = {this.state.recs} />
			</div>
			);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'))
