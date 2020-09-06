import React from 'react'
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";
import {logout} from "../../store/actions/auth";


class Logout extends React.Component
{
    componentDidMount() {
        this.props.logout();
    }


    render() {
        return <Redirect to='/auth'/>
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout : () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)