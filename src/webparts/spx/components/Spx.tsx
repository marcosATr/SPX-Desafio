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
              <span className={styles.title}>SpaceX Photo Gallery</span>
              {props.apiResponse.upcoming ? (
                <p className={styles.subTitle}>
                  Images from the upcoming {props.apiResponse.name} mission.
                </p>
              ) : (
                <p className={styles.subTitle}>
                  Photos from the latest {props.apiResponse.name} mission. Click
                  to enlarge.
                </p>
              )}

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
              </div>
              <a
                href={`${props.apiResponse.links.webcast}`}
                className={styles.button}
              >
                <span className={styles.button}>Watch</span>
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
                    {props.apiResponse.success ? (
                      <p>{props.apiResponse.name} mission was successful.</p>
                    ) : (
                      <p>
                        {props.apiResponse.name} mission was unsuccessful or on
                        hold.
                      </p>
                    )}
                    <div>
                      <span
                        className={styles.button}
                        onClick={() => {
                          previousItem();
                        }}
                      >
                        Anterior
                      </span>{" "}
                      <span
                        className={styles.button}
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
