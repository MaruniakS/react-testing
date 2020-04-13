import React, { Component } from 'react';
import { connect } from 'react-redux';

import requireAuth from 'components/requireAuth';

import * as actions from 'actions';

class CommentBox extends Component {
    state = { comment: ' '};

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    handleChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.saveComment(this.state.comment);

        this.setState({
            comment: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} data-testid="comment-form">
                    <h4>Add a Comment</h4>
                    <textarea value={this.state.comment} onChange={this.handleChange} data-testid="comment-textarea"/>
                    <div>
                        <button data-testid="comment-button-submit">
                            Submit Comment
                        </button>
                    </div>
                </form> 
                <button
                    onClick={this.props.fetchComments}
                    className="fetch-comments"
                    data-testid="comment-button-fetch"
                >
                    Fetch Comments
                </button>   
            </div>
            
        );
    }
}

export default connect(null, actions)(requireAuth(CommentBox));
