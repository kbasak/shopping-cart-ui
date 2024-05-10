function Home() {
    return (
        <>
            <h1 style={{ textAlign: 'center' }}>Welcome, {localStorage.getItem("name")}</h1>
        </>
    );
}
export default Home;