import React, { Component } from "react";
import { connect } from "react-redux";
import BannerImage from "../../images/res-mast.png";

class PrivacyPolicy extends Component {
  render() {
    return (
      <div id="policy">
        <section className="section-banner mx--3 mb-4">
          <img src={BannerImage} alt="Banner" />
        </section>
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-xl-12 pl-4">
            {/* --- Page Content starts here --- */}
            <h4>PRIVACY POLICY</h4>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eget tellus in quam lacinia porttitor. Donec nec venenatis nisi,
              nec placerat nunc. Phasellus tristique bibendum nunc. Morbi eget
              tempus justo, vel sodales odio. Nunc massa libero, euismod vel
              laoreet eu, elementum vitae nibh. Mauris auctor ullamcorper
              eleifend. Duis volutpat a erat ac condimentum. Vestibulum ac diam
              semper, vestibulum enim et, ultrices odio. Mauris id est at diam
              cursus placerat. Phasellus viverra finibus risus, non maximus
              justo pharetra et. Aenean aliquam ac lorem in congue.
              <br />
              <br />
              Etiam blandit risus nec ex aliquam, sed tincidunt velit consequat.
              Phasellus non enim a turpis egestas faucibus id cursus nisi.
              Praesent ultricies egestas diam, sit amet venenatis elit
              vestibulum sed. Vivamus sed luctus augue. Mauris non tristique
              odio. Quisque consequat, eros ut euismod euismod, leo augue tempor
              odio, in convallis dolor dui quis dui. Phasellus in metus felis.
              Vivamus rhoncus justo eget urna gravida, sit amet pellentesque
              nisi mollis. Donec viverra vehicula purus, nec dictum metus
              molestie vitae.
              <br />
              <br />
              Donec pulvinar et augue vitae consequat. Donec aliquet scelerisque
              eros rhoncus sollicitudin. Curabitur eget nunc ex. Integer tellus
              massa, dapibus nec feugiat non, sodales in sapien. Ut a
              condimentum nisl. Pellentesque aliquam facilisis dui. Integer id
              quam turpis. Pellentesque gravida ultrices sapien at hendrerit.
              Aliquam facilisis dapibus lectus, at consequat magna rhoncus
              porta. Vivamus interdum nulla nisl, et malesuada nisi cursus eu.
              Phasellus ornare orci massa, id bibendum ligula mollis in.
            </p>
            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(PrivacyPolicy);
