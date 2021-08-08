import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./Spx.module.scss";
import { ISpxProps } from "./ISpxProps";
import { escape } from "@microsoft/sp-lodash-subset";

export default function Spx(props) {
  //All Photos Available At 'api.links.flickr'
  const photos = props.apiResponse.links.flickr.original;

  //modal state

  const [modalStatus, setModalStatus] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  //Finding active Item
  const findItem = (item) => {
    const results = photos.filter((photo, i) => {
      if (photo == item) {
        setActiveIndex(i);
        return photo;
      }
    });
    console.log(activeIndex);
  };

  //Next Photo

  //Activating modal.
  const enlarge = (e) => {
    setModalStatus(!modalStatus);
    findItem(e.target.src);
  };

  const nextItem = () => {
    activeIndex < photos.length - 1
      ? setActiveIndex(activeIndex + 1)
      : setActiveIndex(0);

    console.log(activeIndex);
  };

  const previousItem = () => {
    activeIndex > 0
      ? setActiveIndex(activeIndex - 1)
      : setActiveIndex(photos.length - 1);
  };

  const closeModal = () => {
    setModalStatus(false);
    setActiveIndex(null);
  };

  return (
    <>
      <div className={styles.spx}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Space X Flight Info</span>
              <span className={styles.label}>Upcoming?</span>
              <p className={styles.subTitle}>Clique para aumentar.</p>

              <div className={styles.gallery}>
                {photos.map((photo, i) => {
                  if (i == 0) {
                    return (
                      <div key={photo} className={styles.photoOne}>
                        <img
                          src={photo}
                          alt="Space X lastest photos"
                          onClick={(e) => {
                            enlarge(e);
                          }}
                        />
                      </div>
                    );
                  } else if (i < 5) {
                    return (
                      <div key={photo}>
                        <img
                          src={photo}
                          alt="Space X lastest photos"
                          onClick={(e) => {
                            enlarge(e);
                          }}
                        />
                      </div>
                    );
                  }
                })}
                {/* <div className={styles.rocketImage}>
                <img src={props.apiResponse.links.patch.small} />
              </div> */}
              </div>
              <p className={styles.description}>qualquer coisa</p>

              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
          {modalStatus && (
            <div className={styles.modal}>
              <div className={styles["modalContent"]}>
                <div className={styles.modalImageHolder}>
                  <span
                    className={styles.close}
                    onClick={() => {
                      closeModal();
                    }}
                  >
                    &times;
                  </span>
                  <img src={photos[activeIndex]} />
                  <div>
                    <p>Some text in the Modal..</p>
                    <div>
                      <span
                        onClick={() => {
                          previousItem();
                        }}
                      >
                        Anterior
                      </span>{" "}
                      <span
                        onClick={() => {
                          nextItem();
                        }}
                      >
                        Próxima
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
