import { render, screen } from '@testing-library/react';
import Async from './Async';

describe('Async component', () => {
    test('Renders posts if request succeeds', async () => {
        // ! Working with Mocks
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: 'p1', title: 'First post'}]
        }
        );
        render(<Async />)


        // ! The difference with find vs getAllByRole is that find is used for PROMISES, because at the beginning the posts will not be available
        // ! This find method receives other arguments, one is the exact thing and the other is a timeout which u can tell it how much to wait to get all the data
        const listItemElements = await screen.findAllByRole('listitem');
        // ! The expectation will be that listElementsItem is not empty. That's why we say listItemsElement.length is NOT zero
        expect(listItemElements).not.toHaveLength(0)
    })
})