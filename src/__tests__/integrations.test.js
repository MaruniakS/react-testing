import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import { render, fireEvent, getByTestId } from '@testing-library/react'

import Root from 'Root';
import App from 'components/App';

beforeEach(() => {
    moxios.install();
    moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
        status: 200,
        response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
    });
});

afterEach(() => {
    moxios.uninstall();
});

describe('enzyme style', () => {
    let wrapped;

    beforeEach(() => {
        moxios.install();
        moxios.stubRequest('https://jsonplaceholder.typicode.com/comments', {
            status: 200,
            response: [{ name: 'Fetched #1' }, { name: 'Fetched #2' }]
        });
        wrapped = mount(
            <Root>
                <App />
            </Root>
        );
    });
    
    afterEach(() => {
        moxios.uninstall();
        wrapped.unmount();
    });
    
    it('can fetch list of comments', (done) => {
       wrapped.find('.fetch-comments').simulate('click');

       moxios.wait(() => {
            wrapped.update();
            expect(wrapped.find('li').length).toEqual(2);
            done();
       })
    });
})

describe('testing-library style', () => {
    let queries;

    beforeEach(() => {
        const { ...resultQueries } = render(
            <Root>
                <App />
            </Root>
        );
        
        queries = resultQueries;
    })

    afterEach(() => {
        queries.unmount();
    })

    it('can fetch list of comments #2', (done) => {
        const fetchButton = queries.getByTestId('comment-button-fetch');
        fireEvent.click((fetchButton));

        moxios.wait(() => {
            expect(queries.getAllByTestId('comment-li').length).toEqual(2);
            done();
       })
    });

});
