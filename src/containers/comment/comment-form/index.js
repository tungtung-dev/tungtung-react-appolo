import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';

@reduxForm({
    form: 'commentForm'
})
export default class CommentForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }

    render() {
        const {handleSubmit} = this.props;
        return <form onSubmit={handleSubmit}>
            <label>You comment</label>
            <Field className="form-control" name="content" type="text" component="textarea"/>
            <button className="btn btn-primary btn-block">Add Comment</button>
        </form>
    }
}
