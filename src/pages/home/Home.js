import React, { useRef, useState } from 'react';
import Header from '../../components/home/header/Header';
import useClickOutside from '../../helpers/ClickOutside';

const Home = () => {
    const [visible, setVisible] = useState(true);
    const el = useRef(null);
    useClickOutside(el, () => {
        setVisible(false)
    });
    return (
      <div>
        <Header />
        {/* {visible && <div className="card" ref={el}></div>} */}
      </div>
    );
};

export default Home;