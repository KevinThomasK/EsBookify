import React from "react";
import classes from "./Footer.module.css";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <div className={classes.FooterBackground}>
      <div className={classes.FooterContent}>
        <div className={classes.about}>
          <h3>EsBookify</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto
            atque ea quasi vitae veritatis minima, sit facilis eius possimus
            pariatur deleniti laboriosam commodi, libero velit minus amet, a
            soluta iure distinctio nostrum exercitationem. Ratione unde ducimus
            fugiat laboriosam, pariatur eos sit porro ab provident, libero,
            doloribus tempore repudiandae iste rem.
          </p>
        </div>
        <div className={classes.importantLinks}>
          <h4>Important Links</h4>
          <li>
            <a href="/usertournaments">Tournaments</a>
          </li>
          <li>
            <a href="/UserScrimList">Scrims</a>
          </li>
          <li>
            <a href="/UserOpenRoom">Open Rooms</a>
          </li>
          <li>
            <a href="/UserDailyMatch">Daily Match</a>
          </li>
          <h5>Copyright&copy; 2023 EsBoofiky</h5>
        </div>
        <div className={classes.usefulLinks}>
          <h4>Useful Links</h4>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Blogs</a>
          </li>
          <li>
            <a href="#">FAQ</a>
          </li>

          <h5 className={classes.h}>
            Follow us on <FaFacebook /> <FaInstagram />
            <FaWhatsapp />
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Footer;
