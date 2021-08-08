import * as React from "react";
import styles from "./Spx.module.scss";
import { ISpxProps } from "./ISpxProps";
import { escape } from "@microsoft/sp-lodash-subset";

const MyComponent = (props) => {
  console.log(props.proper);
  return <div className={styles.gallery}></div>;
};

export default function Spx(props) {
  //All Photos Available At 'api.links.flickr'
  const photos = props.apiResponse.links.flickr.original;
  const currentIndex = () => {};
  const firstFive = () => {};
  // First Five
  return (
    <div className={styles.spx}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <span className={styles.title}>Space X Flight Info</span>
            <span className={styles.label}>Upcoming?</span>
            <p className={styles.subTitle}>
              Clique para aumentar.
            </p>
            <div className={styles.gallery}>
              {photos.map((photo, i) => {
                if (i == 0) {
                  return (
                    <div key={photo} className={styles.photoOne}>
                      <img src={photo} />
                    </div>
                  );
                } else if (i < 5) {
                  return (
                    <div key={photo}>
                      <img src={photo} />
                    </div>
                  );
                }
              })}
              {/* <div className={styles.rocketImage}>
                <img src={props.apiResponse.links.patch.small} />
              </div> */}
            </div>
            <p className={styles.description}>qualquer coisa</p>
            <p>
              <MyComponent name="bill" info={props.apiResponse} />
            </p>
            <a href="https://aka.ms/spfx" className={styles.button}>
              <span className={styles.label}>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
