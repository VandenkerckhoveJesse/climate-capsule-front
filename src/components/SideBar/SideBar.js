import styles from "./sideBar.module.css";
import SearchView from "./SearchView";
import PlaceDetailsView from "./PlaceDetailsView";

const SideBar = ({
    suggestions,
    isLoading,
    searchPlace,
    setSearchPlace,
    searchRadius,
    setSearchRadius,
    selectedPlace,
    onSuggestionSelect,
    onGoBackToSearch,
}) => {
    return (
        <div className={styles.container}>
            {!selectedPlace ? (
                <SearchView
                    {...{
                        suggestions,
                        isLoading,
                        searchPlace,
                        setSearchPlace,
                        searchRadius,
                        setSearchRadius,
                        onSuggestionSelect,
                    }}
                />
            ) : (
                <PlaceDetailsView selectedPlace={selectedPlace} onGoBack={onGoBackToSearch} />
            )}
        </div>
    );
};

export default SideBar;
