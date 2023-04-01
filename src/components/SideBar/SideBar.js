import styles from "./sideBar.module.css";
import SearchView from "./SearchView";
import PlaceDetailsView from "./PlaceDetailsView";
import NewStory from "./NewStory";

const SideBar = ({
    filteredPlaces,
    isFilteredPlacesLoading,
    searchPlace,
    setSearchPlace,
    searchRadius,
    setSearchRadius,
    selectedPlace,
    onPlaceSelect,
    onGoBackToSearch,
    isAddStoryMode,
    setIsAddStoryMode,
    selectedLocation,
}) => {
    return (
        <div className={styles.container}>
            {selectedPlace ? (
                <PlaceDetailsView place={selectedPlace} onGoBack={onGoBackToSearch} />
            ) : isAddStoryMode ? (
                <NewStory
                    selectedLocation={selectedLocation}
                    onCancel={() => setIsAddStoryMode(false)}
                    onSubmit={newStory => alert(JSON.stringify(newStory))}
                />
            ) : (
                <SearchView
                    {...{
                        places: filteredPlaces,
                        isPlacesLoading: isFilteredPlacesLoading,
                        searchPlace,
                        setSearchPlace,
                        searchRadius,
                        setSearchRadius,
                        onPlaceSelect,
                        onAddClicked: () => setIsAddStoryMode(true),
                    }}
                />
            )}
        </div>
    );
};

export default SideBar;
