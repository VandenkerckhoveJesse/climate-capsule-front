import styles from "./sidebar.module.css";

const PlaceDetailsView = ({ selectedPlace, onGoBack }) => {
    return (
        <div style={styles.detailsContainer}>
            <button onClick={onGoBack} style={{ fontWeight: "bolder" }}>
                {"<---"}
            </button>
            <h1>{selectedPlace.name}</h1>
        </div>
    );
};

export default PlaceDetailsView;
