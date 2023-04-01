import styles from "./sidebar.module.css";
import SearchView from "./SearchView";
import PlaceDetailsView from "./PlaceDetailsView";

const SideBar = ({
    suggestions,
    isLoading,
    setSearchPlace,
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
                        setSearchPlace,
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
