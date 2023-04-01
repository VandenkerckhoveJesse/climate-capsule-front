const PlaceDetailsView = ({ selectedPlace, onGoBack }) => {
    return (
        <div>
            <h1>{selectedPlace.name}</h1>
            <button onClick={onGoBack}>go back</button>
        </div>
    );
};

export default PlaceDetailsView;
