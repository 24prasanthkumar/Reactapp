import { Form, Button } from "react-bootstrap";
import { useRef, useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { BsFillGearFill } from "react-icons/bs";
import Colorcomponent from "./components/colors";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;
const App = () => {
	const searchInput = useRef(null);
	const [images, setImages] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [page, setPage] = useState(1);
	const [themeColor, setthemeColor] = useState({
		background: "#087E8B",
		text: "white",
	});
	const [visibel, setVisibel] = useState("");
	useEffect(() => {
		document.body.style.backgroundColor = themeColor.background;

		return () => {
			document.body.style.backgroundColor = "#ffff";
		};
	}, [themeColor]);

	useEffect(() => {
		visibel;
	}, [visibel]);

	const fetchImages = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${API_URL}?query=${
					searchInput.current.value
				}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
					import.meta.env.VITE_API_KEY
				}`
			);
			console.log("data", data);
			setImages(data.results);
			setTotalPages(data.total_pages);
		} catch (error) {
			console.log(error);
		}
	}, [page]);

	useEffect(() => {
		fetchImages();
	}, [fetchImages]);

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(searchInput.current.value);
		fetchImages();
		setPage(1);
	};
	const handledivs = (value) => {
		searchInput.current.value = value;
		console.log("page", page);
		fetchImages();
		setPage(1);
	};

	return (
		<div className="container">
			<h1
				className="title"
				style={{ textAlign: "center", marginTop: "20px", color: "white" }}
			>
				Welcome to Unsplash Images
			</h1>
			<p
				style={{ color: "white", float: "right" }}
				onClick={() => setVisibel("")}
			>
				<BsFillGearFill />
				Customise Page
			</p>
			<Colorcomponent available={visibel} />

			<img id="search-img" src="./src/assets/OIP.jpg" alt="testimg"></img>
			<div className="searchsection">
				<Form onSubmit={handleSubmit}>
					<Form.Control
						type="search"
						placeholder="Type something to search..."
						className="search-input"
						ref={searchInput}
					/>
					<div className="filters">
						<div onClick={() => handledivs("Nature")}>Nature</div>
						<div onClick={() => handledivs("Birds")}>Birds</div>
						<div onClick={() => handledivs("Cats")}>Cats</div>
						<div onClick={() => handledivs("Shoes")}>Shoes</div>
					</div>
					<Button className="submitbutton" type="submit">
						Search
					</Button>
				</Form>
			</div>
			<div className="buttons">
				{page > 1 && (
					<Button className="previous" onClick={() => setPage(page - 1)}>
						Previous
					</Button>
				)}
				{page < totalPages && (
					<Button className="next" onClick={() => setPage(page + 1)}>
						Next
					</Button>
				)}
			</div>
			<div className="images">
				{images.map((image) => {
					return (
						<img
							key={image.id}
							src={image.urls.small}
							alt={image.alt_description}
							className="image"
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
