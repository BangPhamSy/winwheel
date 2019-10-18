import React, { Component } from "react";
import { connect } from "react-redux";
import Collapse from "../components/common/Collapse";

const children = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies scelerisque lorem ornare ultrices. Praesent nec erat sodales, tristique sapien non, molestie dolor. Morbi finibus sapien est, in sollicitudin purus suscipit eget. Nulla maximus pulvinar sem ac ultrices. Donec malesuada sem vitae fringilla imperdiet.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ultricies scelerisque lorem ornare ultrices. 

Praesent nec erat sodales, tristique sapien non, molestie dolor. Morbi finibus sapien est, in sollicitudin purus suscipit eget. Nulla maximus pulvinar sem ac ultrices. Donec malesuada sem vitae fringilla imperdiet.`;

class Faqs extends Component {
  render() {
    return (
      <div id="faq">
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-xl-12 pl-4 mt-4">
            {/* --- Page Content starts here --- */}

            <h4 className="mb-4">REWARDS FAQ</h4>

            <div className="box">
              <Collapse
                heading={"Lorem Ipsum Dolor Amet Duit Consectuit"}
                children={children}
              />
              <Collapse
                heading={"Lorem Ipsum Dolor Amet Duit Consectuit"}
                children={children}
              />
              <Collapse
                heading={"Lorem Ipsum Dolor Amet Duit Consectuit"}
                children={children}
              />
              <Collapse
                heading={"Lorem Ipsum Dolor Amet Duit Consectuit"}
                children={children}
              />
            </div>

            {/* --- Page Content ends here --- */}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Faqs);
