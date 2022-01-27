import { connect } from 'react-redux';
import React, {Component} from 'react';

import Bezoeken from '../components/Bezoek/bezoeken';

class BezoekContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let bezoeken = [
            { name: "Mike Wazowski", comment: "Mike is depicted as a proud monster. Mike had a lonesome childhood and struggled to make friends.", image: "monster5.jpg", isEditing: false },
            { name: "Smitty", comment: "A monster that works as maintenance and errand monsters at Monsters, Inc.", image: "monster8.jpg", isEditing: false },
            { name: "Lanky", comment: "A monster with a small head and long arms and legs who is good friends with Pete \"Claws\" Ward and George Sanderson.", image: "monster7.jpg", isEditing: false },
            { name: "Lotje", comment: "Het mooiste monstertje van al :D ", image: "monster9.jpg", isEditing: false }
            
        ]
    }

    render() {
        return (
            <Bezoeken {...this.props} />
        );
    }
}


const mapStateToProps = (state) => {
    // mapStateToProps: mapping of the props with the state
    return {
        bezoeken: state.bezoeken
    }
};

const mapDispatchToProps = (dispatch) => {
    // mapDispatchToProps: mapping of the eventhandlers with dispatch
    return {
        
    }
};

export default connect( mapStateToProps, mapDispatchToProps )(BezoekContainer);