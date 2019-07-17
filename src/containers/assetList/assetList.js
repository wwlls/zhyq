import React from 'react';
import PullLoad from 'component/pullLoad/pullLoad';

class AssetList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currPage: 1,
		};
	}

	componentDidMount = () => {
		
	};

	render = () => {
		return (
			<PullLoad />
		)
	}
}

export default AssetList;