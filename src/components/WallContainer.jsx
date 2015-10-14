import React, {Component, PropTypes} from 'react';
import climb from 'climb-social';
import Wall from './Wall';


class WallContainer extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        items: []
    };

    static propTypes = {
        collectionId: PropTypes.string.isRequired,
        limit: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string
        ])
    };

    static defaultProps = {
        collectionId: '561ba63445284e1740e016f7',
        limit: 30
    };

    init() {

        if (!this.props.collectionId) {
            return;
        }

        climb
            .getStream(this.props.collectionId, this.props.limit)
            .subscribe(items => {

                const mappedItems = {};
                items.map(item => {
                    mappedItems[item.id] = item;
                });

                this.setState({
                    items: mappedItems
                });

            });
    }

    componentDidMount() {
        this.init();
    }

    render() {
        return (
            <Wall items={this.state.items}/>
        );
    }
}

export default WallContainer;
