import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";


const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default MainLayout;