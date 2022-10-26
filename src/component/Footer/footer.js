import React from "react";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare as FB, faInstagram as IG, faTwitter as TWT , faYoutube as YT} from '@fortawesome/free-brands-svg-icons'
import './footer.css'
import { LogoIcon } from "../../asset/index_image";

function Footer () {
    return (
        <Container fluid style={{paddingBottom: '0.5rem', background: 'rgb(230, 230, 230)'}}>
            <footer>
                <ul className="sosialMedia">
                    <li><a href="https://www.facebook.com/GoodMoviesList/"><FontAwesomeIcon icon={FB}/></a></li>
                    <li><a href="https://www.instagram.com/themovielist/?hl=id"><FontAwesomeIcon icon={IG}/></a></li>
                    <li><a href="https://twitter.com/themoviedb"><FontAwesomeIcon icon={TWT}/></a></li>
                    <li><a href="https://www.youtube.com/c/TheChoiceBox"><FontAwesomeIcon icon={YT}/></a></li>
                </ul>
                <ul className="footerList">
                    <li><a href="/">Condition of Use</a></li>
                    <li><a href="/">Privacy & Policy</a></li>
                    <li><a href="/">Press Room</a></li>

                </ul>
                <div className="copyrightSign">
                    <a href="https://github.com/gihonhon"><FontAwesomeIcon icon={faCube}/></a>
                    <span>&copy;2022 Created by Honhon</span>
                </div>
            </footer>
        </Container>
    )
}

export default Footer
