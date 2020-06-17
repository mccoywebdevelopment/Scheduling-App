import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';

class UnExpand extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <div className="my-expand" onClick={this.props.expandHandler.bind(this,this.props.day)}>
                    -{this.props.length-1} show less <FontAwesomeIcon icon={faCaretUp} size={'1x'}/>
                </div>
            </>
        )
    }
}
export default UnExpand;