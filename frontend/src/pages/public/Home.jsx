const { categories, setCategories } =
    useContext(PortfolioContext)


useEffect(() => {

    getCategories()
        .then(data => setCategories(data))
        .catch(error => console.error(error));

}, []);