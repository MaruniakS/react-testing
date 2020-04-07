import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
    renderComments() {
        return this.props.comments.map((c, i) => (<li key={`${c} ${i}`} data-testid='comment-li'>{c}</li>));
    }

    render() {
        return (
            <div>
                <ul>{this.renderComments()}</ul>
            </div>
        )
    }
};

const mapStateToProps = ({ comments }) => ({ comments });

export default connect(mapStateToProps)(CommentList);
