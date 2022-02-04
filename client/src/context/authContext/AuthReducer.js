import React from 'react'

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
                errorMessage: action.payload,
            }
        case "LOGOUT":
            return {
                user: null,
                isFetching: false,
                error: false,
            }

        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: [...state.user.followings, action.payload],
                },
            }

        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    followings: state.user.followings.filter((following) => (
                        following !== action.payload
                    ))
                },
            }

        case "ADDFRIEND":
            return {
                ...state,
                user: {
                    ...state.user,
                    friendIds: [...state.user.friendIds, action.payload],
                },
            }

        case "REMOVEFRIEND":
            return {
                ...state,
                user: {
                    ...state.user,
                    friendIds: state.user.friendIds.filter((friendId) => (
                        friendId !== action.payload
                    ))
                },
            }
        case "REMOVEFRIENDREQUESTNOTI":
            return {
                ...state,
                user: {
                    ...state.user,
                    followers: state.user.followers.filter((follower) => (
                        follower !== action.payload
                    ))
                },
            }

        case "UPDATE_START":
            return {
                user: null,
                isFetching: true,
                error: false,
            }
        case "UPDATE_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false,
            }
        case "UPDATE_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: true,
            }
        default:
            return state;
    }
}

export default AuthReducer;
