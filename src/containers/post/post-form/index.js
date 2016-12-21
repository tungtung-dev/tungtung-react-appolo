import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';

@reduxForm({
    form: 'postForm'
})
export default class PostForm extends Component {
    static propTypes = {
        onSubmit: PropTypes.func
    }

    render() {
        const {handleSubmit} = this.props;
        return <form onSubmit={handleSubmit}>
            <label>Title</label>
            <Field className="form-control" name="title" type="text" component="input"/>
            <label>Description</label>
            <Field className="form-control" name="description" type="text" component="textarea"/>
            <label>Content</label>
            <Field className="form-control" name="content" type="text" component="textarea"/>
            <button className="btn btn-primary btn-block">Save post</button>
        </form>
    }
}

