import styles from "./sideBar.module.css";
import SearchView from "./SearchView";
import StoryDetailsView from "./StoryDetailsView";
import NewStory from "./NewStory";

const SideBar = ({
    filteredStories,
    isFilteredStoriesLoading,
    filteredStoriesError,
    searchPlace,
    setSearchPlace,
    searchRadius,
    setSearchRadius,
    selectedStory,
    onStorySelect,
    onGoBackToSearch,
    isAddStoryMode,
    setIsAddStoryMode,
    selectedLocation,
    handleAddNewStory,
}) => {
    return (
        <div className={styles.container}>
            {selectedStory ? (
                <StoryDetailsView story={selectedStory} onGoBack={onGoBackToSearch} />
            ) : isAddStoryMode ? (
                <NewStory
                    selectedLocation={selectedLocation}
                    onCancel={() => setIsAddStoryMode(false)}
                    onSubmit={handleAddNewStory}
                />
            ) : (
                <SearchView
                    {...{
                        stories: filteredStories,
                        isStoriesLoading: isFilteredStoriesLoading,
                        storiesError: filteredStoriesError,
                        searchPlace,
                        setSearchPlace,
                        searchRadius,
                        setSearchRadius,
                        onStorySelect,
                        onAddClicked: () => setIsAddStoryMode(true),
                    }}
                />
            )}
        </div>
    );
};

export default SideBar;
