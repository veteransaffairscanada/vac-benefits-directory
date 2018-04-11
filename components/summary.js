import React, { Component } from "react";
import { Row, Col } from "reactstrap";

type Props = {
  info: mixed
};

class BenefitList extends Component<Props> {
  props: Props;

  state = {
    info: this.props.info
  };

  render() {
    return this.state.info.map((benefit, i) => (
      <Row key={i}>
        <Col>
          <div className="card" style={{ width: "18rem" }}>
            <h7 className="card-header">{benefit.type}</h7>
            <div className="card-body">
              <h5 className="card-title">{benefit.title}</h5>
              <p className="card-text">{benefit.description}</p>
            </div>
            <div className="card-footer text-muted">
              <a href="#">View Details</a>
            </div>
          </div>
        </Col>
      </Row>
    ));
  }
}

export default BenefitList;
