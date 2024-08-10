import { React, useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selUser, changeUser, userCommentsAsync, userPostAsync, userCommentsSelector, userPostSelector } from './usersSlice';


const User = () => {
    const dispatch = useDispatch();
    const curUser = useSelector(selUser);
    const curUserPosts = useSelector(userPostSelector);
    const curUserComments = useSelector(userCommentsSelector);
    const [ user, setUser ] = useState(curUser);

    useEffect(() => {
        if (document.getElementById('comment-list')) {
            document.getElementById('comment-list').innerHTML = ''
            document.getElementById('posts-list').innerHTML = ''
        }            
    }, [curUser, dispatch]);

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(changeUser({newUser: user}));
      dispatch(userCommentsAsync(user));
      dispatch(userPostAsync(user))

      
    } 

    const handleChange = (e) => {
        setUser(e.target.value)
    }

    const handleClick = (e) => {
        console.log(e.target.querySelector('div.post-body'))
        e.target.querySelector('div.post-body').classList.toggle('hide-description')
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <label htmlFor="reddit-user">Username:</label>
                <input type="text" id="reddit-user" onChange={handleChange} />            
                <input type="submit" value="Submit"/>
            </form>

            {curUserComments.length>0 && (
                <ul id='comment-list'>
                    {curUserComments.map((obj) => (
                        <div>
                            <li className='user-comment'>{obj.comment}</li>
                            <li className='reddit-sub'>{obj.subreddit}</li>
                        </div>
                    ))}
                </ul>
            )}
            {curUserPosts.length>0 && (
                <ul id='posts-list'>
                    {curUserPosts.map((obj) => (
                        <div>
                            <li className='user-post-title' onClick={handleClick}>
                                {obj.post_title}                                
                                <div className='post-body hide-description'>{obj.post_body}</div>
                            </li>
                        </div>                        
                    ))}
                </ul>                
            )}
            
        </div>
    )
}

export default User;