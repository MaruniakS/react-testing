import React from 'react';
import { mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react'

import CommentBox from 'components/CommentBox';
import Root from 'Root';

describe('enzyme style', () => {
    let wrapped;

    beforeEach(() => {
        wrapped = mount(<Root><CommentBox/></Root>);
    })
    
    afterEach(() => {
        wrapped.unmount();
    })
    
    it('has a text area and a button', () => {
        expect(wrapped.find('textarea').length).toEqual(1);
        expect(wrapped.find('button').length).toEqual(2);
    });
    
    describe('the text area', () => {
        beforeEach(() => {
            wrapped.find('textarea').simulate('change', {
                target: { value: 'new comment' }
            });
            wrapped.update();
        });
    
        it('has a text area that user can type in', () => {
            expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
        });
    
        it('submits and empties form', () => {   
            wrapped.find('form').simulate('submit');
            wrapped.update();
            expect(wrapped.find('textarea').prop('value')).toEqual('');
        });
    })
})

describe('testing-library style', () => {
    let queries

    beforeEach(() => {
        const { ...resultQueries } = render(<Root><CommentBox /></Root>);
        queries = resultQueries;
    })

    afterEach(() => {
        queries.unmount();
    })

    it('has a text area and buttons #2', () => {
        expect(queries.getByTestId('comment-textarea')).toBeTruthy();
        expect(queries.getByTestId('comment-button-submit')).toBeTruthy();
        expect(queries.getByTestId('comment-button-fetch')).toBeTruthy();
    });

    describe('text area', () => {
        let textarea;
        beforeEach(() => {
            textarea = queries.getByTestId('comment-textarea');
            fireEvent.change(textarea, { target: { value: 'new comment' }});
        });

        it('has a text area that user can type in #2', () => {
            expect(textarea.value).toEqual('new comment');
        });
        
        it('submits and empties form #2', () => {

            expect(textarea.value).toEqual('new comment');
        
            fireEvent.submit(queries.getByTestId('comment-form'));
            expect(textarea.value).toEqual('');
        });
    }) 
})
