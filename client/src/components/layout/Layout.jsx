// Layout.js
import React from 'react';
import Navbar from './Navbar';
import CustomFooter from './CustomFooter';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <CustomFooter />
  </div>
);

export default Layout;
