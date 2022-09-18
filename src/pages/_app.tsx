import '../styles/global.scss';
import {Header} from '../components/Header';
import {SessionProvider} from "next-auth/react";

function MyApp({ session, Component , pageProps }) {
    return (
        <>
            <SessionProvider session={session}>
                <Header/>
                <Component {...pageProps} />
            </SessionProvider>
        </>

    )
}

export default MyApp
