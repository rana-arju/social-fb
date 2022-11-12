import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/Header';
import LeftMenu from '../../components/home/leftMenu';
import useClickOutside from '../../helpers/ClickOutside';

const Home = () => {
    const [visible, setVisible] = useState(true);
    const {user} = useSelector((state) => ({...state}))
    const el = useRef(null);
    useClickOutside(el, () => {
        setVisible(false)
    });
    return (
      <div>
        <Header />
        <LeftMenu user = {user} />
      </div>
    );
};

export default Home;