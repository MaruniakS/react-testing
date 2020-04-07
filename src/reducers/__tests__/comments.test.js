import commentsReducer from 'reducers/comments';
import { SAVE_COMMENT } from 'actions/types';

it('handles actions of type SAVE_COMMENT', () => {
    const action = {
        type: SAVE_COMMENT,
        payload: 'new comment'
    };

    const newState = commentsReducer([], action);
    
    expect(newState).toEqual(['new comment']);
});

it('handled actions of unknown type', () => {
    const newState = commentsReducer([], { type: 'UNKNOWN'});
    expect(newState).toEqual([]);
});
