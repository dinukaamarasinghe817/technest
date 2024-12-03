import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

function CustomerLayout({ scrollToContactUs }) {
    return (
        <div>
            <Header scrollToContactUs={scrollToContactUs} />
            <main className={"mt-20 max-md:mt-16"}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default CustomerLayout;