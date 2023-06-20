import { useEffect, useState } from "react";

import Styles from "../../styles/Test.module.css";
import axios from "axios";

export default function Windowbook() {
  return (
    <div>
      <div className={Styles.sign}>
        <h1>Window study</h1>
      </div>
      <div className={Styles.bookshelf}>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div class={`${Styles.booktilted} `}>
          <div className={`${Styles.book} ${Styles.bookumber}`}>
            <h2>Harry Potter</h2>
          </div>
        </div>

        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={Styles["booilted"]}>
          <div className={`${Styles.book} ${Styles.bookgreen}`}>
            <h2>Actionscript:</h2>
            <h3>The Definitive Guide</h3>
          </div>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookumber}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
        <div className={`${Styles.book} ${Styles.bookgreen}`}>
          <h2>Harry Potter</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookspringer}`}>
          <h2>Introducing HTML5</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>CSS For Dummies</h2>
        </div>
        <div className={`${Styles.book} ${Styles.bookblue}`}>
          <h2>Actionscript:</h2>
          <h3>The Definitive Guide</h3>
        </div>
      </div>
    </div>
  );
}
