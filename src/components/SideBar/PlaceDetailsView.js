import { useState } from "react";
import { CCarousel, CCarouselItem, CModal, CModalBody, CModalHeader, CModalTitle } from "@coreui/react";
import styles from "./placeDetailsView.module.css";

const Book = ({ place, isOpen, setIsOpen }) => {
    const renderPage = page => {
        switch (page.type) {
            case "IMAGE":
                return (
                    <div className={styles.imagePage}>
                        <img src={page.content} alt={place.title} />;
                    </div>
                );
            case "TEXT":
                return <div className={styles.textPage}>{page.content}</div>;
            default:
                return null;
        }
    };

    return (
        <CModal fullscreen visible={isOpen} onClose={() => setIsOpen(false)}>
            <CModalHeader>
                <CModalTitle>{place.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCarousel dark interval={false} controls style={{ height: "100%" }}>
                    {place.book.pages.map(page => (
                        <CCarouselItem key={page.type + page.content} style={{ height: "100%" }}>
                            <div className={styles.pageContainer}>{renderPage(page)}</div>
                        </CCarouselItem>
                    ))}
                </CCarousel>
            </CModalBody>
        </CModal>
    );
};

const PlaceDetailsView = ({ place, onGoBack }) => {
    const [isBookOpen, setIsBookOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button className={styles.goBack} onClick={onGoBack}>
                {"<--- Go back"}
            </button>
            <div className={styles.title}>{place.title}</div>
            <div className={styles.content}>{place.summary.slice(0, 1_200)}...</div>
            <div className={styles.showMore}>
                <button onClick={() => setIsBookOpen(true)}>continue reading?</button>
                <Book place={place} isOpen={isBookOpen} setIsOpen={setIsBookOpen} />
            </div>
            <div className={styles.footer}>
                <div className={styles.date}>Jack Huffmann</div>
                <div className={styles.author}>10-1-1982</div>
            </div>
        </div>
    );
};

export default PlaceDetailsView;
