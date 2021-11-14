import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext/AuthContext";
import { Paginations } from "../paginations/Paginations"
import SearchedUser from "../searchedUser/SearchedUser";
import queryString from "query-string";
import "./searchResult.css";
import { useHistory, useLocation } from "react-router-dom";

const SearchResult = ({ queryParam }) => {
    const history = useHistory();
    const [searchedUsers, setSearchedUsers] = useState([]);
    const { user } = useContext(AuthContext);
    const { username } = queryString.parse(queryParam);
    const [totalResultNumber, setTotalResultNumber] = useState(0);
    const [page, setPage] = useState(1);
    const limit = 5;

    console.log(queryParam)

    useEffect(() => {
        fetchSearchResult();
    }, [queryParam, page])

    useEffect(() => {
        fetchTotalResultNumber();
    }, [])

    const fetchSearchResult = async () => {
        try {
            const res = await axios.get("users/search" + queryParam);
            setSearchedUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTotalResultNumber = async () => {
        try {
            const res = await axios.get("users/search?username=" + username);
            setTotalResultNumber(res.data.length);
        } catch (error) {
            console.log(error);
        }
    }


    const handleChangePage = (event, value) => {
        const { username } = queryString.parse(queryParam);
        setPage(value);
        history.push(`/search?username=${username}&_page=${value}&_limit=${limit}`)
    }

    return (
        <div className="searchResult">
            <div className="searchResultContainer">
                {
                    searchedUsers.length == 0
                        ? <h3>No user has found</h3>
                        : searchedUsers.map((searchedUsers) => (
                            <SearchedUser searchedUser={searchedUsers} />
                        ))
                }
                <Paginations onChangePage={handleChangePage} page={page} totalResultNumber={totalResultNumber} limit={limit} />
            </div>
        </div>
    )
}

export default SearchResult
