import styles from "./searchView.module.css";
import { useCallback, useState } from "react";
import { useEvent } from "react-use";
import clsx from "clsx";

const PlaceItem = ({ isActive, filteredPlaces, onClick }) => {
    const autoScrollRefCallback = useCallback(
        node => {
            if (node !== null && isActive) {
                node.scrollIntoView({ behavior: "auto", block: "nearest" });
            }
        },
        [isActive]
    );

    return (
        <li ref={autoScrollRefCallback} className={clsx(styles.place, isActive && styles.active)} onClick={onClick}>
            {filteredPlaces.title}
        </li>
    );
};

const SearchView = ({
    filteredPlaces,
    loading,
    searchPlace,
    setSearchPlace,
    searchRadius,
    setSearchRadius,
    onPlaceSelect,
}) => {
    const [activePlaceIndex, setActivePlaceIndex] = useState(-1);

    useEvent("keydown", event => {
        if (!filteredPlaces) return;

        // navigate the places with arrow keys
        if (event.key === "ArrowDown") {
            setActivePlaceIndex((activePlaceIndex + 1) % filteredPlaces.length);
        } else if (event.key === "ArrowUp") {
            setActivePlaceIndex((activePlaceIndex - 1 + filteredPlaces.length) % filteredPlaces.length);
        } else if (event.key === "Enter") {
            onPlaceSelect(filteredPlaces[activePlaceIndex]);
        }
    });

    const handleSearchTextChange = event => {
        setSearchPlace(event.target.value);
        setActivePlaceIndex(-1);
    };

    const handleInputKeyDown = event => {
        const isPlacesNavigationKey = ["ArrowDown", "ArrowUp", "Enter"].includes(event.key);
        if (isPlacesNavigationKey) event.preventDefault();
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
                value={searchPlace}
            />
            <input
                type={"number"}
                min={1}
                className={styles.input}
                placeholder={"radius in KM (default 1)"}
                onKeyDown={handleInputKeyDown}
                value={searchRadius}
                onChange={event => setSearchRadius(Number(event.target.value) || 1)}
            />
            {loading ? (
                <div className={styles.loading}>Loading...</div>
            ) : filteredPlaces?.length > 0 ? (
                <ul className={styles.pacesList}>
                    {filteredPlaces.map((place, index) => (
                        <div key={place.name} onMouseOver={() => setActivePlaceIndex(index)}>
                            <PlaceItem
                                place={place}
                                isActive={index === activePlaceIndex}
                                onClick={() => onPlaceSelect(place)}
                            />
                        </div>
                    ))}
                </ul>
            ) : (
                <div className={styles.emptyPlaces}>No places</div>
            )}
        </>
    );
};

export default SearchView;
