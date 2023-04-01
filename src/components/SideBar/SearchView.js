import styles from "./sidebar.module.css";
import { useCallback, useState } from "react";
import { useEvent } from "react-use";
import clsx from "clsx";

const Suggestion = ({ isActive, suggestion, onClick }) => {
    const autoScrollRefCallback = useCallback(
        node => {
            if (node !== null && isActive) {
                node.scrollIntoView({ behavior: "auto", block: "nearest" });
            }
        },
        [isActive]
    );

    return (
        <li
            ref={autoScrollRefCallback}
            className={clsx(styles.suggestion, isActive && styles.active)}
            onClick={onClick}>
            {suggestion.name}
        </li>
    );
};

const SearchView = ({ suggestions, isLoading, setSearchPlace, setSearchRadius, onSuggestionSelect }) => {
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

    useEvent("keydown", event => {
        if (!suggestions) return;

        // navigate the suggestions with arrow keys
        if (event.key === "ArrowDown") {
            setActiveSuggestionIndex((activeSuggestionIndex + 1) % suggestions.length);
        } else if (event.key === "ArrowUp") {
            setActiveSuggestionIndex((activeSuggestionIndex - 1 + suggestions.length) % suggestions.length);
        } else if (event.key === "Enter") {
            onSuggestionSelect(suggestions[activeSuggestionIndex]);
        }
    });

    const handleSearchTextChange = event => {
        setSearchPlace(event.target.value);
        setActiveSuggestionIndex(-1);
    };

    const handleInputKeyDown = event => {
        const isSuggestionNavigationKey = ["ArrowDown", "ArrowUp", "Enter"].includes(event.key);
        if (isSuggestionNavigationKey) event.preventDefault();
    };

    return (
        <>
            <input
                type={"text"}
                autoComplete="off"
                className={styles.input}
                placeholder={"Search a place"}
                onKeyDown={handleInputKeyDown}
                onChange={handleSearchTextChange}
            />
            <input
                type={"number"}
                min={1}
                className={styles.input}
                placeholder={"radius in KM (default 1)"}
                onKeyDown={handleInputKeyDown}
                onChange={event => setSearchRadius(Number(event.target.value) || 1)}
            />
            {isLoading ? (
                <div className={styles.loading}>Loading...</div>
            ) : suggestions.length > 0 ? (
                <ul className={styles.suggestionsList}>
                    {suggestions.map((suggestion, index) => (
                        <div key={suggestion.name} onMouseOver={() => setActiveSuggestionIndex(index)}>
                            <Suggestion
                                suggestion={suggestion}
                                isActive={index === activeSuggestionIndex}
                                onClick={() => onSuggestionSelect(suggestion)}
                            />
                        </div>
                    ))}
                </ul>
            ) : (
                <div className={styles.emptySuggestions}>No suggestions</div>
            )}
        </>
    );
};

export default SearchView;