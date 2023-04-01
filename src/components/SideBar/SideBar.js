import styles from "./sideBar.module.css";
import SearchView from "./SearchView";
import PlaceDetailsView from "./PlaceDetailsView";

const SideBar = ({
    places,
    isLoading,
    searchPlace,
    setSearchPlace,
    searchRadius,
    setSearchRadius,
    selectedPlace,
    onPlaceSelect,
    onGoBackToSearch,
}) => {
    return (
        <div className={styles.container}>
            {!selectedPlace ? (
                <SearchView
                    {...{
                        places,
                        isLoading,
                        searchPlace,
                        setSearchPlace,
                        searchRadius,
                        setSearchRadius,
                        onPlaceSelect,
                    }}
                />
            ) : (
                <PlaceDetailsView selectedPlace={selectedPlace} onGoBack={onGoBackToSearch} />
            )}
        </div>
    );
};

export default SideBar;
