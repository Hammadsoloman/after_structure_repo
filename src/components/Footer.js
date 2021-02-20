import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter
      color="blue"
      className="font-small pt-4 mt-4"
      style={{ backgroundColor: '#00D1B2', marginTop: '100px !important' }}
    >
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title" style={{ textAlign: 'center' }}>
              E-commerce
            </h5>
            {/* <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p> */}
          </MDBCol>
          <MDBCol md="6" fluid style={{ marginLeft: '20px' }}>
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="#!">Home</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Cart</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Order</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Admin</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer
          fluid
          style={{ textAlign: 'center', marginTop: '100px !important' }}
        >
          &copy; {new Date().getFullYear()} Copyright:{' '}
          <a href="https://github.com/Hammadsoloman"> Hammad </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;
