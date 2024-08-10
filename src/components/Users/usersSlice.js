import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const userCommentsAsync = createAsyncThunk('users/userComment', 
    async (name) => {
        const response = await fetch(`https://www.reddit.com/user/${name}/comments.json`);
        const json = await response.json();
        return json
    }
);

const userPostAsync = createAsyncThunk('users/userPost', 
    async (name) => {
        const response = await fetch(`https://www.reddit.com/user/${name}/submitted.json`);
        const json = await response.json();
        return json
    }
)

const userInfo = createSlice( {
    name: "user",
    initialState: {
        'username': "",
        'posts': [], // Object with form { subreddit: .., selftext: .., title: ..,} 
        'comments': [], // Object of form  { link_title, subreddit, user_comment (body in json) }
        'isLoadingComments': false,
        'isCommentError': false,
        'isLoadingPosts': false,
        'isPostsError': false
    },
    reducers: {
        changeUser(state, action) {
            const { newUser } = action.payload;
            state.username = newUser;
        }
    },
    extraReducers: builder => {
        builder.addCase(userCommentsAsync.pending, (state) => {
                state.isCommentError = false;
                state.isLoadingComments = true;
            }
        ).addCase(userCommentsAsync.rejected, (state) => {
            state.isCommentError = true;
            state.isLoadingComments = false
        }

        ).addCase(userCommentsAsync.fulfilled, (state, action) => {
            state.isCommentError = false;
            state.isLoadingComments = false;
            const commentArray = action.payload.data.children;
            // console.log(commentArray)
            commentArray.forEach((obj) => {
                state.comments.push({
                    'subreddit': obj.data.subreddit,
                    'comment': obj.data.body
                })
            })
        }).addCase(userPostAsync.pending, (state) => {
            state.isLoadingPosts = true;
            state.isPostsError = false;            
        }).addCase(userPostAsync.rejected, (state) => {
            state.isLoadingPosts = false;
            state.isPostsError = true
        }).addCase(userPostAsync.fulfilled, (state, action) => {
            state.isLoadingPosts = false;
            state.isPostsError = false;
            const postsArray = action.payload.data.children;
            postsArray.forEach((obj) => {
                state.posts.push({
                    'subreddit': obj.data.subreddit,
                    'post_title': obj.data.title,
                    'post_body': obj.data.selftext
                })
            })
        })
    }

} );

export const selUser = (state) => state.user.username;
export const userPostSelector = (state) => state.user.posts;
export const userCommentsSelector = (state) => state.user.comments;
export default userInfo.reducer;
export const { changeUser } = userInfo.actions;
export {userCommentsAsync, userPostAsync};