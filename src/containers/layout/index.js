import React from "react";
import './styles.css'

import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";

function Layout(props) {
    return (
        <>
            <Navbar />
            {props.children}
            <Footer />
        </>
    )
}

export { Layout }