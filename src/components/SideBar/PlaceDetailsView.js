import styles from "./placeDetailsView.module.css";

const PlaceDetailsView = ({ place, onGoBack }) => {
    return (
        <div className={styles.container}>
            <button className={styles.goBack} onClick={onGoBack}>
                {"<--- Go back"}
            </button>
            <div className={styles.title}>{place.title}</div>
            <div className={styles.content}>{place.summary.slice(0, 1_200)}...</div>
            <div className={styles.showMore}>
                <button onClick={() => alert("show the book flipping thing")}>continue reading?</button>
            </div>
            <div className={styles.footer}>
                <div className={styles.date}>Jack Huffmann</div>
                <div className={styles.author}>10-1-1982</div>
            </div>
        </div>
    );
};

export default PlaceDetailsView;
