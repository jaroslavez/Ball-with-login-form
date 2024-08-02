import Head from "next/head";

export default function HomeLayout({children}) {
    return (
        <>
            <Head>
                <title>Мячик</title>
                <meta name="description" content="Мяччччччччччччч" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/soccer_ball.svg" />
            </Head>
            {children}
        </>
    )
}