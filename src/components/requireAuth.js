import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuth = (WrappedComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }

        componentDidUpdate() {
            this.shouldNavigateAway();
        }

        shouldNavigateAway() {
            const { auth, history } = this.props;
            if (!auth) {
                history.push('/');
            }
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }

    const mapStateToProps = ({ auth }) => ({ auth });

    return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;
