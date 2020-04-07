import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react'

import Root from 'Root';
import CommentList from 'components/CommentList';

const initialState = {
    comments: [
        'Comment 1',
        'Comment 2'
    ]
};

describe('enzyme style', () => {
    let wrapped;

    beforeEach(() => {
        wrapped = mount(
            <Root initialState={initialState}>
                <CommentList />
            </Root>
        );
    });
    
    afterEach(() => {
        wrapped.unmount();
    });
    
    it('creates one LI per comment', () => {
        expect(wrapped.find('li').length).toEqual(2);
    });

    it('shows the text for each comment', () => {
        initialState.comments.forEach(c => {
            expect(wrapped.render().text()).toContain(c);
        })
    })
})

describe('testing-library style', () => {
    let queries;

    beforeEach(() => {
        const { ...resultQueries } = render(
            <Root initialState={initialState}>
                <CommentList />
            </Root>
        );
        
        queries = resultQueries;
    })

    afterEach(() => {
        queries.unmount();
    })

    it('creates one LI per comment #2', () => {
        expect(queries.getAllByTestId('comment-li').length).toEqual(2);
    });

    it('shows the text for each comment', () => {
        initialState.comments.forEach(c => {
            expect(queries.queryByText(c)).toBeTruthy();
        });

        expect(queries.queryByText('no such comment')).toBeNull();
    })
});
