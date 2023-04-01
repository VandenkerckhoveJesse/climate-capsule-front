import { useCallback, useState } from "react";
import styles from "./sidebar.module.css";
import { useSuggestions } from "./useSuggestions";
import clsx from "clsx";
import { useEvent } from "react-use";

// id
// location: {lat, lng}
// title
// book:
//   pages: {type, content}
// summary
// author
// data

const Suggestion = ({ isActive, suggestion }) => {
    const autoScrollRefCallback = useCallback(
        node => {
            if (node !== null && isActive) {
                node.scrollIntoView({ behavior: "auto", block: "nearest" });
            }
        },
        [isActive]
    );

    return (
        <li ref={autoScrollRefCallback} className={clsx(styles.suggestion, isActive && styles.active)}>
            {suggestion.name}
        </li>
    );
};

const SideBar = () => {
    const [searchText, setSearchText] = useState("");
    const { suggestions, isLoading } = useSuggestions(searchText);

    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

    const handleSearchTextChange = event => {
        setSearchText(event.target.value);
        setActiveSuggestionIndex(0);
    };

    const handleInputKeyDown = event => {
        const isSuggestionNavigationKey = ["ArrowDown", "ArrowUp", "Enter"].includes(event.key);
        if (isSuggestionNavigationKey) event.preventDefault();
    };

    useEvent("keydown", event => {
        if (!suggestions) return;

        // navigate the suggestions with arrow keys
        if (event.key === "ArrowDown") {
            setActiveSuggestionIndex((activeSuggestionIndex + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            setActiveSuggestionIndex((activeSuggestionIndex - 1 + suggestions.length) % suggestions.length);
        } else if (event.key === "Enter") {
            const pressedSuggestion = suggestions[activeSuggestionIndex];
            alert(pressedSuggestion.name);
        }
    });

    return (
        <div className={styles.container}>
            <input
                type={"text"}
                autoComplete="off"
                className={styles.input}
                placeholder={"Search a place"}
                onKeyDown={handleInputKeyDown}
                onChange={handleSearchTextChange}
            />
            {isLoading ? (
                <div style={{ marginLeft: "16px" }}>Loading...</div>
            ) : suggestions ? (
                <ul className={styles.suggestionsList}>
                    {suggestions.map((suggestion, index) => (
                        <div key={suggestion.name} onMouseOver={() => setActiveSuggestionIndex(index)}>
                            <Suggestion suggestion={suggestion} isActive={index === activeSuggestionIndex} />
                        </div>
                    ))}
                </ul>
            ) : (
                <div className={styles.emptySuggestions}>No suggestions</div>
            )}
        </div>
    );
};

export default SideBar;
