import { useState } from "react";
import styles from "./sidebar.module.css";

const SideBar = () => {
    const [active, setActive] = useState(false);

    return <div className={styles.container}></div>;
};

export default SideBar;
