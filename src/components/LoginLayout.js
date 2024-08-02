import Head from "next/head";

export default function LoginLayout({children}) {
    return (
        <>
            <Head>
                <title>Логин</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/login.ico" />
            </Head>
            {children}
        </>
    )
}