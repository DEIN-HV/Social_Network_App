import "./search.css"
import SearchResult from '../../components/searchResult/SearchResult'
import { Sidebar } from '../../components/sidebar/Sidebar'
import { Topbar } from '../../components/topbar/Topbar'
import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom";
import queryString from "query-string"

const Search = () => {
    const { search } = useLocation();
    const { username } = queryString.parse(search);
    const searchRef = useRef();

    useEffect(() => {
        searchRef.current = username
    }, [])

    return (
        <>
            <Topbar searchValue={username} />
            <div className="homeContainer">
                <Sidebar />
                <SearchResult queryParam={search} />
            </div>
        </>
    )
}

export default Search
