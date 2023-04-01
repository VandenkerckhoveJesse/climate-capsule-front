import styles from "./placeDetailsView.module.css";
import { loremEpsum } from "../../utils/string";

const PlaceDetailsView = ({ selectedPlace, onGoBack }) => {
    return (
        <div className={styles.container}>
            <button className={styles.goBack} onClick={onGoBack}>
                {"<--- Go back"}
            </button>
            <div className={styles.title}>{selectedPlace.name}</div>
            <div className={styles.content}>{loremEpsum().slice(0, 1_200)}...</div>
            <div className={styles.footer}>
                <div className={styles.date}>Jack Huffmann</div>
                <div className={styles.author}>10-1-1982</div>
            </div>
        </div>
    );
};

export default PlaceDetailsView;
