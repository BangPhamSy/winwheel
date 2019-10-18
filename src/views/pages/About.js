import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Translate, getActiveLanguage } from "react-localize-redux";
// import { Gmaps, Marker } from "react-gmaps"
// import BannerImage from "../../images/about-header@2x.png"
import BannerImage from "../../images/res-mast.png";

class AboutUs extends React.Component {
  render() {
    return (
      <div id="about">
        <section className="section-banner mx--3 mb-4">
          <img src={BannerImage} alt="About Banner" />
        </section>
        <div className="row justify-content-center mt-3">
          <div className="col-12 col-xl-11">
            {/* --- Page Content starts here --- */}
            <div className="row address justify-content-center section mb-4 pb-4">
              <div className="text-left col-12 col-xl-12 col-lg-12 mb-2 mt-2">
                <h4 className="text-left about-title mb-3">
                  <Translate id="aboutUs._AboutUsTitle" />
                </h4>
                <div className="mb-3">
                  <h4 className="text-our">OUR ORIGINS</h4>
                  <div className="row mt-3">
                    <div className="col">
                      <p>
                        RE&S was founded in 1988 by Osaka native Hiroshi Tatara,
                        bringing a slice of Japanese lifestyle to Singapore with
                        our Takahashi and Fiesta restaurants. As RE&S grew, we
                        developed new brands and concepts like Kuriya, Shimbashi
                        Soba, Kuishin Bo and Ichiban Boshi. Today, we’re a
                        household name all over Singapore. Most recently, we’ve
                        expanded our Japanese food production and distribution
                        capabilities, adding dozens of food products on top of
                        our current offerings. Our story, our future, is just
                        beginning.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="text-our">OUR VISION</h4>
                  <div className="row mt-3">
                    <div className="col">
                      <p>
                        A leading international food service company that
                        develops innovative dining concepts as well as food
                        ingredients specialist.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="text-our">OUR PRINCIPLES</h4>
                  <div className="row mt-3">
                    <div className="col">
                      <p>
                        The RE&S Model for Excellence drives our business
                        operations and is the foundation upon which we build a
                        culture of business success, happy employees and
                        satisfied customers.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="text-our">OUR BUSINESSES</h4>
                  <div className="row mt-3">
                    <div className="col">
                      <p>
                        Our specialty is Japanese cuisine. Our approach?
                        International. 
                      </p>
                      <p className="mt-3">
                        With restaurants around the region and as one of
                        Singapore’s largest restaurant operators, we serve
                        millions of customers a year. Beyond restaurants, our
                        business also includes convenient food retail outlets,
                        and the supplying of quality food ingredients to other
                        food service & hospitality businesses. We do this from
                        our modern 40,000 square feet Central Kitchen that is
                        complete with specialised automated technology and a
                        food testing laboratory, located within our corporate
                        headquarters in Singapore.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

AboutUs.propTypes = {
  currentLanguage: PropTypes.string.isRequired
};

const mapStateToProps = ({ auth, locale }) => ({
  currentLanguage: getActiveLanguage(locale).code
});

export default connect(mapStateToProps)(AboutUs);
